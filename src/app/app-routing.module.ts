import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { TransactionComponent } from './transactions/transaction.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDataComponent } from './users/user-data/user-data.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "edit/:postId", component: SignUpComponent},
  { path: "transaction", component: TransactionComponent},
  { path: "transaction-list", component: TransactionListComponent},
  { path: "user-list", component: UserListComponent},
  { path: "user", component: UserDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
