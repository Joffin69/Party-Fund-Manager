import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  private allUsersSub = new Subject<any>();

  getAllUsersUpdateListener() {
    return this.allUsersSub.asObservable();
  }

  getAllUsers() {
    this.http.get<{message: string, users: any}>('http://localhost:3000/api/user/getUsers')
    .subscribe((result) => {
      this.allUsersSub.next(result.users);
    }, error => {
      console.log(error);
    });
  }

  deleteUser(name: string) {
    const user = {
      userName: name
    };
    this.http.post<{message: string, users: any}>('http://localhost:3000/api/user/deleteUser', user)
    .subscribe((result) => {
      this.allUsersSub.next(result.users);
    }, error => {
      console.log(error);
    });
  }
}
