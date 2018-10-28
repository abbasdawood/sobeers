import { RichText } from 'prismic-dom';
import { PersonStructure } from './structure';
import { CommonService } from '../services/common.service';

export class Person {

    private person = {} as PersonStructure;
    private commonService: CommonService;
    private error: Error;

    constructor(document: any){
        if (document) {
            let raw = document.rawJSON
            this.person.profilePicture = raw.profile_picture.url || this.commonService.generatePlaceholderImage(300)
            this.person.name = RichText.asText(raw.name).trim()
            this.person.designation = raw.designation
            this.person.department = raw.team_name
            this.person.guest = raw.guest
            this.person.employee = raw.employee
            this.person.company = raw.company
            this.person.gradient = raw.gradient

            switch (this.person.department) {
                case 'design':
                case 'art': this.person.group = 'visualisers'; break;
                case 'content': this.person.group = 'storytellers'; break;
                case 'brand experience': this.person.group = 'jugglers'; break;
                default: this.person.group = 'jugglers'; break;
            }

        } else {
            this.error = new Error('Document not found')
        }
    }

    getPerson() : PersonStructure{
        return this.person
    }

}
