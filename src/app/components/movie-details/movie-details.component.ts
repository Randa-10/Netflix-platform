import { Component, Injector, Input, OnInit, SimpleChanges, inject, OnChanges } from '@angular/core';
import { DescriptionPipe } from './../../shared/pipe/description.pipe';
import { MoviesService } from '../../shared/services/movies.service';
import { IVideoContent } from './../../shared/models/ivideo-content';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImgPipe } from "../../shared/pipe/img.pipe";
import { HeaderComponent } from '../header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { VideoPipe } from '../../shared/pipe/video.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
    imports: [DescriptionPipe, ImgPipe,HeaderComponent,NgIf,RouterModule,VideoPipe,MatProgressSpinnerModule,FooterComponent]
})
export class MovieDetailsComponent implements OnInit,OnChanges {
  isLoading: boolean = false;
  userProfileImg!: string;
  movieService: MoviesService;
  movieService2: ActivatedRoute;
  currentdetai: number = 0;
  movei!: IVideoContent | undefined;
  productsIDSList:number[]=[];
  currentPrdIndex:number=0;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
     ) {
    this.movieService = moviesService;
    this.movieService2 = activatedRoute;

  }

  ngOnInit(): void {
    this.isLoading=true
    this.movieService2.paramMap.subscribe((paramMap) => {
      this.currentdetai = paramMap.get('id') ? Number(paramMap.get('id')) : 0;
      this.movieService.getBannerDetail(this.currentdetai).subscribe(
        (foundedProduct: IVideoContent) => {
          this.isLoading=false

          this.movei = foundedProduct;
        },
        (error) => {
          console.error('Error fetching movie details:', error);
          alert('Not Found Product');
        }
      );
    });


  }

  @Input() key = 'exWFS-0Rois';
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) { // Use 'key' instead of 'Key'
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${changes['key'].currentValue}?autoplay=1&mute=1&loop=1&controls=0`
      );
    }
  }

  showTrailer: boolean = false;

  toggleTrailer(): void {
    this.showTrailer = !this.showTrailer;
  }

  goToPrevious(): void {
    if (this.currentdetai > 1) {
      this.currentdetai--;
      this.updateMovieDetails();
    }
  }

  goToNext(): void {
    // const totalMovies = 10;
    // if (this.currentdetai < totalMovies) {
      this.currentdetai++;
      this.router.navigate(['/details', this.currentdetai++]);
      this.updateMovieDetails();
    // }
  }

  private updateMovieDetails(): void {
    this.isLoading = true;
    this.router.navigate(['/details', this.currentdetai]); // Assuming the route is '/movies/:id'
  }


}
