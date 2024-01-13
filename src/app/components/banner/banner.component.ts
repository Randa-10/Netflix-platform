import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DescriptionPipe } from "../../shared/pipe/description.pipe";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IVideoContent } from '../../shared/models/ivideo-content';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-banner',
    standalone: true,
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss',
    imports: [DescriptionPipe,NgFor,RouterModule]
})
export class BannerComponent implements OnChanges {

@Input({required:true}) bannerTitle='';
@Input() bannerOverview='';
@Input() key='r_pUE7OcN8w';
@Input() videoContents: IVideoContent[] = [];

private sanitizer=inject(DomSanitizer)
private breakpointObserver=inject (BreakpointObserver)
@Input() isSmallScreen: boolean = false;
constructor(){
  this.breakpointObserver
  .observe([Breakpoints.XSmall, Breakpoints.Small])
  .subscribe(result => {
    this.isSmallScreen = result.matches;
  });
}
videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
ngOnChanges(changes: SimpleChanges): void {
  if(changes ['Key']){
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  }
}
}
