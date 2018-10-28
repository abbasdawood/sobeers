import { Component, OnInit, Input } from '@angular/core';
import { CaseInfo } from '../../../models/structure';

@Component({
  selector: 'sc-case-tile',
  templateUrl: './case-tile.component.html',
  styleUrls: ['./case-tile.component.scss']
})
export class CaseTileComponent implements OnInit {

  @Input('case') case: CaseInfo;
  
  constructor() { }

  ngOnInit() {
  }

}
