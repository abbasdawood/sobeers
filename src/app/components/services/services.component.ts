import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../../services/prismic.service';
import { Service } from '../../models/service';

@Component({
  selector: 'sc-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  intro: any = {};
  services: any[] = []

  constructor(
    private prismicService: PrismicService
  ) { }

  ngOnInit() {
    this.prismicService.getServices().then(document => {
      let s = new Service(document)
      this.intro = s.getBasicInfo()
      this.services = s.getServices()
    }).catch(e => console.error(e))
  }

}
