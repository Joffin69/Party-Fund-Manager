import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule,
         MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatDatepickerModule,
         MatSelectModule,
         MatCheckboxModule,
         MatIconModule,
         MatTableModule,
         MatExpansionModule,
         MatTooltipModule,
         MatDividerModule} from '@angular/material';
import { MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './app-header/header.component';
import { TransactionComponent } from './transactions/transaction.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AlertComponent } from './alert/alert.component';
import { UserDataComponent } from './users/user-data/user-data.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    TransactionComponent,
    SignUpComponent,
    TransactionListComponent,
    UserListComponent,
    AlertComponent,
    UserDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule
  ],
  entryComponents: [AlertComponent],
  providers: [{provide: MAT_DIALOG_DATA, useValue: {}}, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
