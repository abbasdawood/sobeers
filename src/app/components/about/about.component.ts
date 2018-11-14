import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../../services/prismic.service';
import { RichText } from 'prismic-dom';
import * as _ from 'lodash';

@Component({
  selector: 'sc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  showMore: boolean = false
  title: string
  subtitle: string
  content: string

  selectedEvent: any = {}
  showEventDescription: boolean = false;
  clickedCoordinate: any = {}

  throwbacks = []

  constructor(
    private prismicService: PrismicService
  ) { }

  ngOnInit() {
    this.prismicService.getAbout().then(document => {
      let raw = document.data

      this.title = RichText.asText(raw.title).trim()
      this.subtitle = RichText.asText(raw.subtitle).trim()
      this.content = RichText.asHtml(raw.content)

      let t = raw.checkpoint.map(c => {
        return {
          year: c.year,
          month: c.month,
          description: RichText.asHtml(c.achievement)
        }
      })

      this.throwbacks = _.chain(t)
        .groupBy('year')
        .map((value, key) => {
          return {
            year: key,
            events: value
          };
        })
        .sortBy('year')
        .reverse()
        .value()

    })
  }

  openDescription(event, mouseEvent: MouseEvent) {
    this.selectedEvent = event
    this.showEventDescription = true
    this.clickedCoordinate['left'] = mouseEvent.x
    this.clickedCoordinate['top'] = mouseEvent.y + 64
  }

  closeDescription() {
    this.showEventDescription = false
    this.selectedEvent = {}
    this.clickedCoordinate = {}
  }

}
