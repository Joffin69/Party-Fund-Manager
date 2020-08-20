import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Transactions } from './transactions.model';

@Injectable({providedIn: 'root'})

export class TransacService {
  transacs: Transactions[] = [];
  transUpdated = new Subject<{transactions: Transactions[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  addTransaction(transname: string, transamount: number, transacType: string, transdate: string, transComments: string) {
    const transacForm = {
      name: transname,
      amount: transamount,
      transType: transacType,
      date: transdate,
      comments: transComments
    };
    this.http.post('http://localhost:3000/api/trans/addTrans', transacForm)
    .subscribe(result => {
      this.router.navigate(['/transaction-list']);
    }, error => {
      console.log(error);
    });
  }

  getAllTransactions() {
    this.http.get<{message: string, transactions: any}>('http://localhost:3000/api/trans/getTrans')
    .subscribe((result) => {
      this.transacs = result.transactions;
      console.log(result);
      this.transUpdated.next({transactions: this.transacs});
    }, error => {
      console.log('An error occurred while getting all transactions');
    });
  }

  getTransUpdateListener() {
    return this.transUpdated.asObservable();
  }

  deleteTransaction(transacId: string) {
    const trans = {
      transactionId : transacId
    };
    this.http.post<{message: string, transactions: any}>('http://localhost:3000/api/trans/deleteTrans', trans)
    .subscribe(result => {
      this.transacs = result.transactions;
      this.transUpdated.next({transactions: this.transacs});
    }, error => {
      console.log(error);
    });
  }

}
