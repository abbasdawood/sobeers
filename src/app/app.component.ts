import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sc';

  constructor(
    private router: Router
  ){ }

  changeHamburgerColor(url: string){
    if(!url.includes('work/')){
      document.getElementsByClassName('line-menu')[0].classList.add('black')
      document.getElementsByClassName('line-menu')[1].classList.add('black')
      document.getElementsByClassName('line-menu')[2].classList.add('black')
    } else {
      document.getElementsByClassName('line-menu')[0].classList.remove('black')
      document.getElementsByClassName('line-menu')[1].classList.remove('black')
      document.getElementsByClassName('line-menu')[2].classList.remove('black')
    }
  }

  ngOnInit(){
    this.router.events.subscribe((event: NavigationEnd) => {
      if(event.url){
        this.changeHamburgerColor(event.url)
      }
    })
  }

}
