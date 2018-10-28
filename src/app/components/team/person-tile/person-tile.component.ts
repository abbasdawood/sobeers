import { Component, OnInit, Input } from '@angular/core';
import { PrismicService } from '../../../services/prismic.service';
import { Person } from '../../../models/person';
import { PersonStructure } from '../../../models/structure';

@Component({
  selector: 'sc-person-tile',
  templateUrl: './person-tile.component.html',
  styleUrls: ['./person-tile.component.scss']
})
export class PersonTileComponent implements OnInit {

  @Input('id') id: string
  person: PersonStructure

  constructor(
    private prismicService: PrismicService
  ) { }

  ngOnInit() {
    this.prismicService.getById(this.id || 'W6kDCxAAACAArFsK').then(document => {
      console.log(document)
      let person = new Person(document)
      this.person = person.getPerson()
    }).catch(e => console.error(`Error: ${e}`))
  }

}
