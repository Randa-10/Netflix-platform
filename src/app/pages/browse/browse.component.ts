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

@Component({
    selector: 'app-browse',
    standalone: true,
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
    imports: [CommonModule, HeaderComponent, BannerComponent,MovieCaruoselComponent,FooterComponent]
})
export class BrowseComponent implements OnInit {

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
// this.movieService.getMovies().subscribe(res=>
//   {console.log(res)
// this.popularMovies=res.results
//   }
//   )

    // if (isPlatformBrowser(this.platformId)) {
    //   const loggedInUserString = sessionStorage.getItem("loggedInUser");

    //   if (loggedInUserString) {
    //     const loggedInUser = JSON.parse(loggedInUserString);

    //     if (loggedInUser) {
    //       // Access user properties only if loggedInUser is not null
    //       this.name = loggedInUser.name || '';
    //       this.userProfileImg = loggedInUser.picture || '';
    //       this.email = loggedInUser.email || '';

    //     }
    //   }
  //   }
  // }

  signOut(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
