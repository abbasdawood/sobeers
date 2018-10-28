import { Component, OnInit } from '@angular/core';
import { PrismicService } from '../../services/prismic.service';
import { CaseStudy, CaseInfo } from '../../models/structure';
import { Case } from '../../models/case';

@Component({
  selector: 'sc-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  page: number = 1
  limit: number = 10
  cases = [] as CaseInfo[]
  showMore: boolean = false;

  constructor(
    private prismicService: PrismicService
  ) { }

  loadCases(page, limit){
    this.prismicService.getCases(page, limit).then(response => {
      if(response.next_page){
        this.showMore = true
      } else {
        this.showMore = false
      }
      this.cases = response.results.map(document => {
        let c = new Case(document)
        return c.getCaseSnapshot()
      })

      console.log(this.cases)
    })
  }

  ngOnInit() {
    this.loadCases(1, 10)
  }

}
