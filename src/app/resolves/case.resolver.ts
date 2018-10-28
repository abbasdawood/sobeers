import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PrismicService } from '../services/prismic.service';

@Injectable()
export class CaseResolver implements Resolve<any> {
  constructor(
    private prismicSvc: PrismicService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.prismicSvc.getById(route.params.id);
  }
}