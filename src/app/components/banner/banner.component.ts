import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DescriptionPipe } from "../../shared/pipe/description.pipe";

@Component({
    selector: 'app-banner',
    standalone: true,
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss',
    imports: [DescriptionPipe]
})
export class BannerComponent implements OnChanges {

@Input({required:true}) bannerTitle='';
@Input() bannerOverview='';
@Input() key='r_pUE7OcN8w';
private sanitizer=inject(DomSanitizer)
videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
ngOnChanges(changes: SimpleChanges): void {
  if(changes ['Key']){
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  }
}
}
