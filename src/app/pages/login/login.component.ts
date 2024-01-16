

declare const google: any;

import { Component, OnInit, inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { log } from 'node:console';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '180351739638-e1c75ksr1i8id82o48hk9p3j7kja6169.apps.googleusercontent.com',
      callback: (resp: any) => {this.handleLogin(resp)
        console.log(resp)}
      // }
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })

  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
    if(response) {
      const payLoad = this.decodeToken(response.credential);

      localStorage.setItem("loggedInUser", JSON.stringify(payLoad));


      this.router.navigate(['profile'])
    }

}
}







// declare const google: any;

// import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements AfterViewInit, OnInit {
//   private router = inject(Router);

//   ngOnInit(): void {
//     // Initialization code in ngOnInit
//   }

//   ngAfterViewInit(): void {
//     google.accounts.id.initialize({
//       client_id: '180351739638-e1c75ksr1i8id82o48hk9p3j7kja6169.apps.googleusercontent.com',
//       callback: (resp: any) => {
//         this.handleLogin(resp);
//         console.log(resp);
//       }
//     });

//     google.accounts.id.renderButton(document.getElementById("google-btn"), {
//       theme: 'filled_blue',
//       size: 'large',
//       shape: 'rectangle',
//       width: 350
//     });
//   }

//   // Other methods...

//   private decodeToken(token: string) {
//     return JSON.parse(atob(token.split(".")[1]));
//   }

//   handleLogin(response: any) {
//     if (response) {
//       // //decode the token
//       const payLoad = this.decodeToken(response.credential);
//       // //store in session
//       sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));

//       this.router.navigate(['profile']);
//     }
//   }
// }
