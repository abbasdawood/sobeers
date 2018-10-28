import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state, sequence } from '@angular/animations';
import { PrismicService } from '../../services/prismic.service';

@Component({
  selector: 'sc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('animateNav', [
      state('*', style({ height: '36px', width: '36px', background: 'transparent', zIndex: 1000 })),
      state('opened', style({ height: '100vh', width: '100vw', background: 'black', zIndex: 1000 })),
      transition('* => opened', [
        query('.nav-body', stagger('300ms', [
          animate('0.1s ease-in', keyframes([
            style({ height: '45px', width: '45px', background: 'transparent', left: '36px', top: '36px' }),
            style({ height: '100vh', width: '100vh', background: 'black', left: '0', top: '0' }),
          ]))
        ]), { optional: true })
      ]),
      transition('opened => *', [
        query('.nav-body', stagger('0.3s', [
          animate('0.1s ease-out', keyframes([
            style({ height: '100vh', width: '100vh', background: 'black', left: '0', top: '0' }),
            style({ height: '45px', width: '45px', background: 'transparent', left: '36px', top: '36px' })
          ]))
        ]), { optional: true })
      ])
    ]),
    trigger('listAnimation', [

      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('0.1s', [
          animate('0.1s ease-in', keyframes([
            style({ transform: 'translateX(40px)', opacity: 0 }),
            style({ transform: 'translateX(-10px)', opacity: 0.75 }),
            style({ transform: 'translateX(0px)', opacity: 1 })
          ]))
        ]), { optional: true }),
        query(':leave', stagger('0.1s', [
          animate('0.1s ease-out', keyframes([
            style({ transform: 'translateX(0px)', opacity: 1 }),
            style({ transform: 'translateX(40px)', opacity: 0 })
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class NavComponent implements OnInit {

  public state: boolean = false
  public loading: boolean = false
  public navState: string = ''
  public primaryLinks = []
  public secondaryLinks = []
  public links = []
  public copyrightInfo;
  public companyInfo;

  public socials = [
    { icon: 'fa-facebook', link: '//facebook.com/theSoCheers' },
    { link: '//instagram.com/theSoCheers', icon: 'fa-instagram' },
    { link: '//twitter.com/theSoCheers', icon: 'fa-twitter' },
    { link: '//www.linkedin.com/company/1867805/', icon: 'fa-linkedin' },
    { link: '//www.youtube.com/user/TheSoCheers', icon: 'fa-youtube' }
  ]

  constructor(
    private prismicService: PrismicService
  ) { }

  populateLinks(populate: boolean, links?: any[]) {
    if (populate) {
      setTimeout(() => {
        links.forEach(l => {
          this.links.push(l)
        })
      }, 100);
    } else {
      this.links.forEach((l, index) => { this.links.splice(index, 1) })
      this.links = []
    }
  }

  ngOnInit() {
    this.loading = true
    this.prismicService.getNavigation().then(document => {
      let raw = document.rawJSON

      this.primaryLinks = raw.links.map(value => {
        return {
          name: value.link_title,
          route: value.link_route
        }
      })

      this.secondaryLinks = raw.secondary_links.map(value => {
        return {
          name: value.link_title,
          route: value.link_route
        }
      })

      this.companyInfo = raw.company_information
      this.copyrightInfo = raw.copyright_info

      this.loading = false
    }).catch(e => console.error(e))
  }

  toggleNav() {
    if (this.loading) {
      return;
    }
    this.state = !this.state
    if (!this.state) {
      this.populateLinks(false)
    } else {
      this.populateLinks(true, this.primaryLinks)
    }
    this.navState = this.navState === '' ? 'opened' : ''
  }

}
