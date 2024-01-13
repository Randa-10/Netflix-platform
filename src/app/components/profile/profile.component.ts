import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
auth=inject(AuthServiceService)
name=JSON.parse(sessionStorage.getItem('loggedInUser')!).name
profileImage=JSON.parse(sessionStorage.getItem('loggedInUser')!).picture
email=JSON.parse(sessionStorage.getItem('loggedInUser')!).email

signOut(){
  sessionStorage.removeItem("loggedInUser");
  this.auth.signOut();
}
}
