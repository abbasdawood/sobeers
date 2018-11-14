import { Component, OnInit } from '@angular/core';
import { Case } from '../../../models/case';
import { CaseStudy } from '../../../models/structure';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sc-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  caseStudy: CaseStudy
  backgroundImage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRoute.data
			.subscribe(data => {
        let caseStudy = new Case(data.case)
      this.caseStudy = caseStudy.getCase()
      this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.5)), url(${this.caseStudy.info.cover.main})`)
      }, err => console.error(err))
  }

}
