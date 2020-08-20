import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'PartyFundManager';
  // hasError: boolean;
  // private alertSub: Subscription;

  // constructor(private alertService: AlertService) {}

  // ngOnInit() {
  //   this.alertSub = this.alertService.getAlertSub()
  //   .subscribe(alertMessage => {
  //     this.hasError = alertMessage !== null;
  //   });
  // }

  // ngOnDestroy() {
  //   this.alertSub.unsubscribe();
  // }
}
