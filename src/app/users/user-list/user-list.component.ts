import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  private usersSub: Subscription;
  users = [];
  displayedColumns = ['name', 'title', 'actions'];
  alertMessage = 'Are you sure you want to remove the user ?';

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userService.getAllUsers();
    this.usersSub = this.userService.getAllUsersUpdateListener()
    .subscribe(users => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  onDeleteUser(userName: string) {
    if (!!userName) {
      const dialogRef = this.dialog.open(AlertComponent, {
        data: {message: this.alertMessage}
      });
      dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.deleteUser(userName);
          this.usersSub = this.userService.getAllUsersUpdateListener()
          .subscribe(users => {
            this.users = users;
          }, error => {
            console.log(error);
          });
        } else {
          return;
        }
      });
    }
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
