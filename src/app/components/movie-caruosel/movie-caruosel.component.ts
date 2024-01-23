import { routes } from './../../app.routes';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../shared/models/ivideo-content';
import { DescriptionPipe } from '../../shared/pipe/description.pipe';
import { ImgPipe } from '../../shared/pipe/img.pipe';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FavService } from '../../shared/services/fav.service';
import {  TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';


export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'../assets/i18n','.json')
}
@Component({
  selector: 'app-movie-caruosel',
  standalone: true,
  templateUrl: './movie-caruosel.component.html',
  styleUrl: './movie-caruosel.component.scss',
  imports: [NgFor, NgIf,DescriptionPipe,ImgPipe,RouterModule,TranslateModule],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCaruoselComponent implements OnInit, AfterViewInit {
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  private breakpointObserver=inject (BreakpointObserver)
  isSmallScreen: boolean = false;
 private favoriteService=inject(FavService)
   constructor(private TranslateService:TranslateService){
  this.breakpointObserver
  .observe([Breakpoints.XSmall, Breakpoints.Small])
  .subscribe(result => {
    this.isSmallScreen = result.matches;
  });
  }
  ngAfterViewInit(): void {
   this.initSwiper();
  }

  ngOnInit() {
  }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        300: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 5,
          centeredSlides: true,
        },
        600: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    })
  }

  setHoverMovie(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name;
  }

  clearHoverMovie() {
    this.selectedContent = null;
  }


// movie-carousel.component.ts

toggleFavorite(movie: IVideoContent): void {
  console.log('Toggle favorite:', movie);
  if (this.favoriteService.isFavorite(movie)) {
    this.favoriteService.removeFromFavorites(movie);
  } else {
    this.favoriteService.addToFavorites(movie);
  }
}

  isFavorite(movie: IVideoContent): boolean {
    return this.favoriteService.isFavorite(movie);
  }


///
toggleLanguageAndDirection(): void {
  const newLang = this.TranslateService.currentLang === 'en' ? 'ar' : 'en';

  const direction = newLang === 'ar' ? 'rtl' : 'ltr';

  this.TranslateService.use(newLang);
  document.documentElement.setAttribute('dir', direction);
}

}
