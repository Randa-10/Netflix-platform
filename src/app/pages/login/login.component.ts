import { style } from '@angular/animations';


declare const google: any;

import { Component, OnInit, inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { log } from 'node:console';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,MatFormFieldModule,MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule,MatFormFieldModule, MatInputModule,MatButtonModule, MatDividerModule,],
  templateUrl: './login.component.html',
  // template: '<button (click)="showErrorModal()">Show Error Modal</button>',
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
    if (this.email.invalid || this.password.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email',
        text: 'Please enter a valid email and password.',
        color: "#000",
        background: 'rgba(200, 200, 200, 0.9)',
        backdrop: `
          background: "gray",
          left top
          no-repeat
        `
      });

      return;
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Successful Login',
        text: 'You have successfully logged in!',
        confirmButtonColor: '#000', // Set the color of the confirm button
      })
      .then((result) => {
        if (result.isConfirmed) {
          // this.router.navigate(['home']);
        }
      });
    }
  }

//googel sign in
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '180351739638-e1c75ksr1i8id82o48hk9p3j7kja6169.apps.googleusercontent.com',
      callback: (resp: any) => {this.handleLogin(resp)
        console.log(resp)}
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {

    });

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
