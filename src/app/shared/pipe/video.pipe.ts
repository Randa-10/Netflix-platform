import { Pipe, PipeTransform } from '@angular/core';
import { IVideoContent } from '../models/ivideo-content';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'video',
  standalone: true
})
export class VideoPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: IVideoContent | undefined): SafeResourceUrl {
    if (value && value.key) {
      const url = `https://www.youtube.com/embed/${value.key}?autoplay=1&mute=1&loop=1&controls=0`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${value?.key}?autoplay=1&mute=1&loop=1&controls=0`); // Handle undefined or missing key
  }

}
