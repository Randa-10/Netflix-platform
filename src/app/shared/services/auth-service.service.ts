declare var google: any;
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

router = inject(Router);

signOut(){
  google.accounts.id.disableAutoSelect();
  this.router.navigate(['/'])
}

}



