import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sc-home-row',
  templateUrl: './home-row.component.html',
  styleUrls: ['./home-row.component.scss']
})
export class HomeRowComponent implements OnInit {

  @Input('row') row;

  constructor() { }

  ngOnInit() {
  }

}
