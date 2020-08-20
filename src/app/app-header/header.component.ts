import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  isUserAuthd = true;
  isUsrAdmin = true;
  hasError: boolean;
  private UsrAdminsSub: Subscription;
  private userAuthSub: Subscription;
  constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   this.isUserAuthd = this.authService.getIsAuthd();
  //   this.isUsrAdmin = this.authService.getIsAdmin();
  //   this.userAuthSub = this.authService.getUserStatsSub()
  //   .subscribe(value => {
  //     this.isUserAuthd = value;
  //   });
  //   this.UsrAdminsSub = this.authService.getAdminSub()
  //   .subscribe(value => {
  //     this.isUsrAdmin = value;
  //   });
  // }

  onLogout() {
    this.authService.onLogOut();
  }

  // ngOnDestroy() {
  //   this.userAuthSub.unsubscribe();
  // }
}
