import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { HeaderComponent } from '../../../app/components/header/header.component';
import { Observable, forkJoin, map } from 'rxjs';
import { BannerComponent } from "../../components/banner/banner.component";
import { MoviesService } from '../../shared/services/movies.service';
import { log } from 'console';
import { MovieCaruoselComponent } from '../../components/movie-caruosel/movie-caruosel.component';
import { IVideoContent } from '../../shared/models/ivideo-content';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-browse',
    standalone: true,
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
    imports: [CommonModule, HeaderComponent, BannerComponent,MovieCaruoselComponent
      ,FooterComponent,MatProgressSpinnerModule,TranslateModule]
})
export class BrowseComponent implements OnInit {
  isLoading: boolean = false;
  auth = inject(AuthServiceService);
  movieService = inject(MoviesService);
  name!: string;
  userProfileImg!: string;
  email!: string;
  bannerDetail$!: Observable<any>;
  bannerVideo$!: Observable<any>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];
// popularMovies:IVideoContent[]=[]
  ngOnInit(): void {
    this.isLoading = true;
    forkJoin(this.sources).pipe(
      map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated])=>{
        this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[0].id);
        this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[0].id);
        return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
      })
    ).subscribe((res:any)=>{
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.ratedMovies = res.ratedMovies.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMovies = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];
      this.isLoading=false
      this.getMovieKey();
      console.log(this.getMovieKey());

    })


  }
    getMovieKey() {
      this.movieService.getBannerVideo(this.movies[0].id)
      .subscribe(res=>{
        console.log(res);
      })
    }

  signOut(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
