import { Component, OnInit, Input } from '@angular/core';
import { BackgroundOptions, GalleryImage } from '../../../../models/structure';
import { GalleryItem, ImageItem, YoutubeItem } from '@ngx-gallery/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';

@Component({
  selector: 'sc-case-row',
  templateUrl: './case-row.component.html',
  styleUrls: ['./case-row.component.scss']
})
export class CaseRowComponent implements OnInit {

  @Input('background') background: BackgroundOptions;
  @Input('pretitle') pretitle: string;
  @Input('title') title: string;
  @Input('content') content: string;
  @Input('direction') direction: string;
  @Input('theme') theme: string;
  @Input('team') team: string[];
  @Input('color') color: string;

  @Input('images') images: GalleryImage[];
  items: GalleryItem[];
  backgroundImage: any;
  backgroundColor: string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    console.log(this.background)
    if(this.background && this.background.url){
      this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${this.background.url})`)
      this.backgroundColor = this.background.color
    } else {
      this.backgroundColor = this.background.color
    }

    if (this.images && this.images.length) {
      this.items = this.images.map((item: GalleryImage) => {
        if (!_.isEmpty(item)) {
          return new ImageItem(item.url, item.thumb)
        } else {
          return new YoutubeItem(item.src)
        }
      })
    }
  }

}
