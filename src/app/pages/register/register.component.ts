declare const google: any;

import { Component, OnInit, inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { log } from 'node:console';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import Swal from 'sweetalert2';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'../assets/i18n','.json')
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, TranslateModule,FlexLayoutModule,CommonModule,MatFormFieldModule, MatInputModule,MatButtonModule, MatDividerModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  private router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private TranslateService:TranslateService){
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter a valid email.';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signIn() {
    if (this.email.invalid) {
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
        confirmButtonColor: '#000',
      })
      .then((result) => {
        if (result.isConfirmed) {
          // this.router.navigate(['/home'])
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
///
toggleLanguageAndDirection(): void {
  const newLang = this.TranslateService.currentLang === 'en' ? 'ar' : 'en';

  const direction = newLang === 'ar' ? 'rtl' : 'ltr';

  this.TranslateService.use(newLang);
  document.documentElement.setAttribute('dir', direction);
}
///
}
