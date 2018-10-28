import { CaseInfo, CaseStudy, CaseContent, BackgroundOptions } from "./structure";
import { RichText } from 'prismic-dom';
import * as _ from 'lodash';

export class Case {

    private case = {} as CaseStudy;
    private error: Error;

    constructor(document: any) {
        console.log(document)
        if (document && document.id) {
            let raw = document.rawJSON
            let info = {} as CaseInfo
            let content = [] as CaseContent[]
            info.id = document.id
            info.title = RichText.asText(raw.title).trim()
            info.tags = document.tags
            info.year = raw.year
            info.client = raw.client.slug
            info.slug = document.slug
            info.cover = {
                main: raw.cover.url,
                mobile: raw.cover.mobile.url,
                tablet: raw.cover.tablet.url,
                tile: raw.cover.tile.url
            }
            info.color = raw.case_color

            content = raw.body.map(slice => {

                let infoMap = {
                    rowTitle: slice.primary.row_title,
                    rowPreTitle: slice.primary.row_pre_title,
                    rowContent: (slice.primary.row_content && slice.primary.row_content.length) ? 
                        RichText.asHtml(slice.primary.row_content): '',
                    direction: slice.primary.row_direction || 'ltr',
                    theme: slice.primary.theme || 'dark'
                }

                let background: BackgroundOptions = {
                    color: slice.primary.row_background_color || '#000',
                    url: _.isEmpty(slice.primary.row_background_image) ? null : slice.primary.row_background_image.url
                }

                infoMap['background'] = background

                switch (slice.slice_type) {
                    case 'row':
                        let gallery = slice.items.map(item => {
                            if (!_.isEmpty(item.gallery_video)) {
                                return { src: item.gallery_video.embed_url }
                            } else if (!_.isEmpty(item.gallery_image)){
                                return { url: item.gallery_image.url }
                            }
                        })

                        infoMap['gallery'] = _.compact(gallery)

                        return infoMap
                    case 'team':
                        let team: string[] = slice.items.map(item => item.person.id)
                        infoMap['team'] = team
                        return infoMap
                }
            })

            this.case = { info: info, content: _.compact(content) }
        } else {
            this.error = new Error('Document not found')
        }
    }

    getCaseSnapshot(): CaseInfo {
        return this.case.info
    }

    getCase(): CaseStudy {
        return this.case
    }

    getError(): Error {
        return this.error;
    }
}
