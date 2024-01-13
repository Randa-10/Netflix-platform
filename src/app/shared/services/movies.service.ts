import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideoContent } from '../models/ivideo-content';

const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQxMzkwZmJhYjllYjEzM2U1NDI1MzExZTk1MDAwOCIsInN1YiI6IjY1MjZmYzk1NmRlYTNhMDEzYTcyN2Y5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0DimgJe9gdbhV-QBTrQ8Rl8H768jVIcqMVV31GI9KQ'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
http=inject(HttpClient)

getMovies() {
  return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
}
getTvShows() {
  return this.http.get('https://api.themoviedb.org/3/discover/tv', options)
}

getRatedMovies() {
  return this.http.get('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', options)
}

getBannerImage(id: number) {
  return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
}

getBannerVideo(id: number):Observable<IVideoContent> {
  return this.http.get<IVideoContent>(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
}

getBannerDetail(id: number):Observable<IVideoContent> {
  return this.http.get<IVideoContent>(`https://api.themoviedb.org/3/movie/${id}`, options);
}

getNowPlayingMovies() {
  return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
}

getPopularMovies() {
  return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
}

getTopRated() {
  return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
}

getUpcomingMovies() {
  return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
}

}
