import { Component, OnInit } from '@angular/core';
import { CaseInfo } from '../../models/structure';
import { PrismicService } from '../../services/prismic.service';
import { Case } from '../../models/case';
import { RichText } from 'prismic-dom';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cases = [] as CaseInfo[];
  jumbotron: any = {};
  rows = [];
  
  constructor(
    private prismicService: PrismicService
  ) { }

  loadCases(page, limit){
    this.prismicService.getCases(page, limit).then(response => {
      this.cases = response.results.map(document => {
        let c = new Case(document)
        return c.getCaseSnapshot()
      })

    })
  }

  loadHomeContent(){
    this.prismicService.getHome().then(document => {
      console.log(document.data)
      let raw = document.data
      this.jumbotron = {
       heading: RichText.asText(raw.jumbotron_heading).trim(),
       content: RichText.asHtml(raw.jumbotron_content),
       button: {
         link: raw.jumbotron_button_link? raw.jumbotron_button_link.url : null,
         text: raw.jumbotron_button_text
       }
      }

      this.rows = raw.body.map(slice => {
        return {
          content: RichText.asHtml(slice.primary.row_content),
          image: (slice.primary.row_image && slice.primary.row_image.url) ? slice.primary.row_image.url : null,
          button: {
            link: slice.primary.row_button_link? slice.primary.row_button_link.url : null,
            text: slice.primary.row_button_text
          },
          direction: slice.primary.row_direction
        }
      })
    })
  }

  ngOnInit() {
    this.loadCases(1,3)
    this.loadHomeContent()
  }

}
