import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { json } from 'stream/consumers';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
auth=inject(AuthServiceService)
name=JSON.parse(sessionStorage.getItem('loggedInUser')!).name
profileImage=JSON.parse(sessionStorage.getItem('loggedInUser')!).picture
email=JSON.parse(sessionStorage.getItem('loggedInUser')!).email
userProfileImg!: string;

signOut(){
  sessionStorage.removeItem("loggedInUser");
  this.auth.signOut();
}
}
