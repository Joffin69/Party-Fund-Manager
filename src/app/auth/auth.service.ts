import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string;
  private name: string;
  private isAdmin = false;
  private isAdminSub = new Subject<boolean>();

  private isUserAuthenticated = false;
  private isUserAuthStatusSub = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getIsAdmin() {
    return this.isAdmin;
  }

  getIsAuthd() {
    return this.isUserAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getName() {
    return this.name;
  }

  getAdminSub() {
    return this.isAdminSub.asObservable();
  }

  getUserStatsSub() {
    return this.isUserAuthStatusSub.asObservable();
  }

  signUp(name: string, password: string, title: string, image: File, content: string, isAdmin: string) {
    const form = new FormData();
    form.append('name', name);
    form.append('password', password);
    form.append('title', title);
    if (image) {
      form.append('image', image, title);
    }
    if (content) {
      form.append('content', content);
    }
    form.append('isAdmin', isAdmin);
    this.http.post<{message: string, result: object}>('http://localhost:3000/api/user/signup', form)
    .subscribe((result) => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    });
  }

  login(name: string, password: string) {
      const user = {
        username: name,
        pwd: password
      };
      this.http.post<{message: string, token: string, expiresIn: number, user: any}>('http://localhost:3000/api/user/login', user)
      .subscribe(result => {
        if (result && result.token) {
          const token = result.token;
          const expireDuration = result.expiresIn;
          this.isUserAuthenticated = true;
          this.isUserAuthStatusSub.next(true);
          if (result.user.isAdmin === 'true') {
              this.isAdmin = true;
              this.isAdminSub.next(true);
          }
          const expirationDate = new Date(
            new Date().getTime() + expireDuration * 1000
          );
          this.saveAuthData(result.user.name, token, expirationDate, result.user.isAdmin);
          this.router.navigate(['/transaction']);
        }
      }, error => {
        console.log(error);
        this.isUserAuthStatusSub.next(false);
        this.isAdminSub.next(false);
      });
  }

  onLogOut() {
    this.isUserAuthenticated = false;
    this.isUserAuthStatusSub.next(false);
    this.isAdmin = false;
    this.isAdminSub.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const expiresIn = authInfo.expiresDate.getTime() - new Date().getTime();
    if (expiresIn > 0) {
      this.token = authInfo.tokenId;
      this.name = authInfo.username;
      this.isUserAuthenticated = true;
      this.isUserAuthStatusSub.next(true);
      if (authInfo.isAdminUser === 'true') {
        this.isAdmin = true;
        this.isAdminSub.next(true);
      }
      this.setAuthTime(expiresIn / 1000);
    }
  }

  saveAuthData(name: string, token: string, expiresIn: Date, isAdmin: string) {
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expiresIn.toISOString());
    localStorage.setItem('isAdmin', isAdmin);
  }

  getAuthData() {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const isAdmin = localStorage.getItem('isAdmin');
    return {
      username: name,
      tokenId: token,
      expiresDate: new Date(expirationDate),
      isAdminUser: isAdmin
    };
  }

  clearAuthData() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('isAdmin');
  }

  setAuthTime(expireDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.onLogOut();
    }, expireDuration * 1000);
  }



}
