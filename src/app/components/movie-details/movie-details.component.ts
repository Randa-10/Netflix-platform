import { routes } from './../../app.routes';
import { Component, Injector, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { DescriptionPipe } from './../../shared/pipe/description.pipe';
import { MoviesService } from '../../shared/services/movies.service';
import { IVideoContent } from './../../shared/models/ivideo-content';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ImgPipe } from "../../shared/pipe/img.pipe";
import { Router } from 'express';
import { HeaderComponent } from '../header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { MovieCaruoselComponent } from '../movie-caruosel/movie-caruosel.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
    imports: [DescriptionPipe, ImgPipe,HeaderComponent,NgIf,RouterModule]
})
export class MovieDetailsComponent implements OnInit {
  userProfileImg!: string;
  movieService: MoviesService;
  movieService2: ActivatedRoute;
  currentdetai: number = 0;
  movei!: IVideoContent | undefined;
  productsIDSList:number[]=[];
  currentPrdIndex:number=0;
  @Input() key='r_pUE7OcN8w';
  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute ) {
    this.movieService = moviesService;
    this.movieService2 = activatedRoute;
  }

  ngOnInit(): void {
    this.movieService2.paramMap.subscribe((paramMap) => {
      this.currentdetai = paramMap.get('id') ? Number(paramMap.get('id')) : 0;
      this.movieService.getBannerDetail(this.currentdetai).subscribe(
        (foundedProduct: IVideoContent) => {
          this.movei = foundedProduct;
        },
        (error) => {
          console.error('Error fetching movie details:', error);
          alert('Not Found Product');
        }
      );
    });
      // this.getBannerVideo();

  }

  private sanitizer=inject(DomSanitizer)
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  ngOnChanges(changes: SimpleChanges): void {
    if(changes ['Key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(
        `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`
      );
    }
  }

  showTrailer: boolean = false;

  toggleTrailer(): void {
    this.showTrailer = !this.showTrailer;
  }


}
