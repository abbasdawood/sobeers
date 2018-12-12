import { Injectable } from '@angular/core';
// import { Prismic } from 'prismic.io';
import * as Prismic from 'prismic-javascript';
import { environment } from '../../environments/environment';

@Injectable()
export class PrismicService {

  constructor() { }

  /**
   * Function to get the document with ID and additional query params
   * @param  {string} id
   * @param  {any} queryObject?
   * @returns Promise
   */
  getById(id: string, queryObject?: any): Promise<any> {
    return Prismic.getApi(environment.apiEndpoint).then(api => {
      return api.getByID(id, queryObject)
    })
  }

  /**
   * Function to get the contents of the home page
   * @returns Promise
   */
  getHome(): Promise<any> {
    return Prismic.getApi(environment.apiEndpoint).then(api => {
      return api.getSingle('home')
    })
  }

  

  /**
   * Function to get the contents of the about page
   * @returns Promise
   */
  getAbout(): Promise<any> {
    return Prismic.getApi(environment.apiEndpoint).then(api => {
      return api.getSingle('about')
    })
  }

  /**
   * Function to get the contents of the services page
   * @returns Promise
   */
  getServices(): Promise<any> {
    return Prismic.getApi(environment.apiEndpoint).then(api => {
      return api.getSingle('services')
    })
  }

  /**
   * Function to get the contents of the navigation
   * @returns Promise
   */
  getNavigation(): Promise<any> {
    return Prismic.getApi(environment.apiEndpoint).then(api => {
      return api.getSingle('navigation')
    })
  }

  /**
   * Function to get documents of type blog_post
   * @param  {number} page
   * @param  {number} pageSize
   * @param  {string} content?
   * @param  {string} tags?
   * @returns Promise
   */
  getCases(page: number = 1, pageSize: number = 10, content?: string, tags?: string, showFeatured?: boolean, after?: string): Promise<any> {
    let filters = [Prismic.Predicates.at('document.type', 'case')]
    let options = { page: page, pageSize: pageSize, orderings: '[my.case.last_publication_date desc]' }

    if (content) {
      filters.push(Prismic.Predicates.fulltext('document', content))
    }

    if (tags) {
      filters.push(Prismic.Predicates.any('document.tags', tags.split(',')))
    }

    if (showFeatured) {
      filters.push(Prismic.Predicates.at('my.blog_post.featured', 'yes'))
    }

    // if(after){
    //   filters.push(Prismic.Predicates.after(after))
    // }

    return Prismic.getApi(environment.apiEndpoint).then(api => {
      return api.query(filters, options)
    })
  }

  /**
   * Function to get documents of type person
   * @param  {number} page
   * @param  {number} pageSize
   * @param  {string} content?
   * @param  {string} tags?
   * @returns Promise
   */
  getPeople(page: number = 1, pageSize: number = 10, showOnlyEmployees: boolean): Promise<any> {
    let filters = [Prismic.Predicates.at('document.type', 'person')]

    if(showOnlyEmployees){
      filters.push(Prismic.Predicates.at('my.person.employee','yes'));
    }

    let options = { page: page, pageSize: pageSize, orderings: '[my.person.position]' }

    return Prismic.getApi(environment.apiEndpoint).then(api => {
      return api.query(filters, options)
    })
  }

}
