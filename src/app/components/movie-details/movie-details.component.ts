// import { IVideoContent } from './../../shared/models/ivideo-content';
// import { Component, Input, inject } from '@angular/core';
// import { DescriptionPipe } from "../../shared/pipe/description.pipe";
// import { MoviesService } from '../../shared/services/movies.service';
// import { IVideoContent } from '../../shared/models/ivideo-content';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//     selector: 'app-movie-details',
//     standalone: true,
//     templateUrl: './movie-details.component.html',
//     styleUrl: './movie-details.component.scss',
//     imports: [DescriptionPipe]
// })
// export class MovieDetailsComponent {
//   @Input({required:true}) bannerTitle='';
//   @Input() bannerOverview='';
//  movieService=inject(MoviesService)
//  movieService2=inject(ActivatedRoute)
//  currentdetai:number=0

//   movei:IVideoContent|undefined=undefined
//   constructor(){
//     this.movieService = moviesService;

//   }
//   ngOnInit(): void {

//     this.movieService2.paramMap.subscribe(paramMap=>{     //to change data by observable

//       this.currentdetai=(paramMap.get('id'))?Number(paramMap.get('id')):0;

//       let foundedProduct = this.movieService.getBannerDetail(this.currentdetai);
//       if(foundedProduct instanceof IVideoContent){
//         this.movei=foundedProduct
//       }
//       else{
//         alert("Not Found Product");
//       }
//     }
//     )
// }
// }
import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { DescriptionPipe } from './../../shared/pipe/description.pipe';
import { MoviesService } from '../../shared/services/movies.service';
import { IVideoContent } from './../../shared/models/ivideo-content';
import { ActivatedRoute } from '@angular/router';
import { ImgPipe } from "../../shared/pipe/img.pipe";
import { Router } from 'express';
import { HeaderComponent } from '../header/header.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-movie-details',
    standalone: true,
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
    imports: [DescriptionPipe, ImgPipe,HeaderComponent,NgIf]
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

//  private router=inject(Router)
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
  }

  // previousFunc(){

  //   this.currentPrdIndex=this.productsIDSList.indexOf(this.currentdetai);
  //   //  console.log(this.currentPrdIndex);

  //   // // arr[2]
  //   this.router.navigate(['/details/:id',this.productsIDSList[--this.currentPrdIndex]]);

  // }
  // nextFunc(){
  //   this.currentPrdIndex=this.productsIDSList.indexOf(this.currentdetai);
  //   this.router.navigate(['/details/:id',this.productsIDSList[++this.currentPrdIndex]])
  // }


  // Sample data, replace with actual movie details
  private sanitizer=inject(DomSanitizer)

  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
  ngOnChanges(changes: SimpleChanges): void {
    if(changes ['Key']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
    }
  }
  showTrailer: boolean = false;

  toggleTrailer(): void {
    this.showTrailer = !this.showTrailer;
  }
}
