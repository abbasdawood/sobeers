import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../../services/prismic.service';
import * as _ from 'lodash';

@Component({
  selector: 'sc-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: string[] = []

  constructor(
    private prismicService: PrismicService
  ) { }

  ngOnInit() {
    this.prismicService.getPeople(1, 100, true).then(response => {
      var results = response.results
      this.team = _.map(results, document => {
        return document.id;
      })
    })
  }

}
