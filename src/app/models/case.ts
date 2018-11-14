import { CaseInfo, CaseStudy, CaseContent, BackgroundOptions } from "./structure";
import { RichText } from 'prismic-dom';
import * as _ from 'lodash';

export class Case {

    private case = {} as CaseStudy;
    private error: Error;

    constructor(document: any) {
        if (document && document.id) {
            let raw = document.data
            let info = {} as CaseInfo
            let content = [] as CaseContent[]
            info.id = document.id
            info.title = RichText.asText(raw.title).trim()
            info.tags = document.tags
            info.year = raw.year
            info.client = raw.client.slug
            info.slug = document.slugs[0]
            info.cover = {
                main: raw.cover.url,
                mobile: raw.cover.mobile.url,
                tablet: raw.cover.tablet.url,
                tile: raw.cover.tile.url
            }
            info.color = raw.case_color

            content = _.map(raw.body, slice => {

                let infoMap = {
                    rowTitle: slice.primary.row_title,
                    rowPreTitle: slice.primary.row_pre_title,
                    rowContent: (slice.primary.row_content && slice.primary.row_content.length) ?
                        RichText.asHtml(slice.primary.row_content) : '',
                    direction: slice.primary.row_direction || 'ltr',
                    theme: slice.primary.theme || 'dark'
                }

                let background: BackgroundOptions = {
                    color: slice.primary.row_background_color || '#000',
                    url: _.isEmpty(slice.primary.row_background_image) ? null : slice.primary.row_background_image.url
                }

                infoMap['background'] = background

                if (slice.slice_type === 'row') {
                    let gallery = slice.items.map(item => {
                        console.log(item)
                        if (!_.isEmpty(item.gallery_image)) {
                            return { url: item.gallery_image.url }
                        } else if (item.gallery_youtube_id) {
                            return { src: item.gallery_youtube_id }
                        }
                    })

                    infoMap['gallery'] = _.compact(gallery)

                    return infoMap
                } else if (slice.slice_type === 'team') {
                    let team: string[] = slice.items.map(item => item.person.id)
                    infoMap['team'] = team
                    return infoMap
                }
            })

            this.case = { info: info, content: _.compact(content) }
            console.log(this.case)
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
