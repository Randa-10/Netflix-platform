import { style } from '@angular/animations';


declare const google: any;

import { Component, OnInit, inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { log } from 'node:console';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter a valid email.';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessagepass() {
    if (this.password.hasError('required')) {
      return 'Your password must contain between 4 and 60 characters.';
    }

    return this.password.hasError('password') ? 'Not a valid password' : '';
  }


  signIn() {
    // Check if the form is not valid
    if (this.email.invalid || this.password.invalid) {
      // Display SweetAlert for invalid form
      Swal.fire({
        icon: 'error',
        title: 'Invalid email',
        text: 'Please enter valid email and password.',
      });
      return;
    }
  }

//googel sign in
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '180351739638-e1c75ksr1i8id82o48hk9p3j7kja6169.apps.googleusercontent.com',
      callback: (resp: any) => {this.handleLogin(resp)
        console.log(resp)}
      // }
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_gray',
      size: 'large',
      shape: 'rectangle',
      width: 200 // Set the width to 100% to make it full-width
    });

    // Add custom styles to override the default Google Sign-In button styles
    // const googleBtn = document.getElementById("google-btn");
    // if (googleBtn) {
    //   googleBtn.style.backgroundColor = 'gray'; // Set the background color to gray
    //   // Add any additional styles as needed
    // }
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
    if(response) {
      const payLoad = this.decodeToken(response.credential);

      localStorage.setItem("loggedInUser", JSON.stringify(payLoad));


      this.router.navigate(['home'])
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
