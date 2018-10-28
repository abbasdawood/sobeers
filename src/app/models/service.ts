import * as _ from 'lodash';
import { RichText } from 'prismic-dom';

export class Service {

    basicInfo: any = {}
    services: any[] = []
    error: Error

    pageTitle: string
    pageContent: string

    constructor(document: any){
        if(document && document.id){
            let raw = _.head(document.rawJSON.body)

            this.pageTitle = RichText.asText(raw.primary.page_title).trim()
            this.pageContent = RichText.asHtml(raw.primary.page_content)

            this.services = raw.items.map(detail => {
                return {
                    background: {
                        color: detail.row_background_color,
                        image: _.isEmpty(detail.row_background_image) ? null : detail.row_background_image.url
                    },
                    content: RichText.asHtml(detail.services_content),
                    id: detail.hashtag
                }
            })

        } else {
            this.error = new Error('No services document found, please add on Prismic')
        }
    }

    getServices(){
        return this.services
    }

    getBasicInfo(){
        return {
            title: this.pageTitle,
            content: this.pageContent
        }
    }
}

