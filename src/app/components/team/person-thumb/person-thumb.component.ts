import { Component, OnInit, Input } from '@angular/core';
import { PersonStructure } from '../../../models/structure';
import { PrismicService } from '../../../services/prismic.service';
import { Person } from '../../../models/person';

@Component({
  selector: 'sc-person-thumb',
  templateUrl: './person-thumb.component.html',
  styleUrls: ['./person-thumb.component.scss']
})
export class PersonThumbComponent implements OnInit {
  
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
