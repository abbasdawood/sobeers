import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  generatePlaceholderImage(width: number, height?: number): string{
    return `//via.placeholder.com/${width}x${height ? height: width}`
  }

}
