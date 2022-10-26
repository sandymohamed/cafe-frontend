import { Component, OnInit } from '@angular/core';
import { faHome, faMugHot, faUserAlt, faReceipt, faPlus, faRectangleList, faRightToBracket, faUserPlus, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  IsAdmin = false;
  IsUser = false;
  username?: string; 

  faHome = faHome;
  faCube =faMugHot;
  user=faUserAlt
  faReceipt=faReceipt
  faPlus =faPlus
  faSchoolCircleExclamation=faRectangleList
  faRightToBracket=faRightToBracket
  faUserPlus=faUserPlus
  faRightFromBracket=faRightFromBracket



  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.IsAdmin = this.roles.includes('ROLE_ADMIN');
      this.IsUser = this.roles.includes('ROLE_USER');

      this.username = `${user.username} - (${user.roles})` ;
    }
  }

  logout(): void {
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
        this.storageService.clean();

        window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }

}
