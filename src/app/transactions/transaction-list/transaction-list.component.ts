import { Component, OnInit, OnDestroy } from '@angular/core';

import { Transactions } from '../transactions.model';
import { TransacService } from '../transactions.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AlertComponent } from 'src/app/alert/alert.component';

@Component({
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})

export class TransactionListComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'transType', 'date', 'amount', 'action'];
  dataSource: Transactions[] = [];
  //   {name: 'Joffin', amount: 200, transType: 'credit', date: '01/02/2019'},
  //   {name: 'Arun', amount: 600, transType: 'credit', date: '01/02/2019'},
  //   {name: 'Wilma', amount: 200, transType: 'debit', date: '01/02/2019'},
  //   {name: 'Veeresh', amount: 200, transType: 'credit', date: '01/02/2019'},
  //   {name: 'Rahul', amount: 894, transType: 'debit', date: '01/02/2019'},
  //   {name: 'Kathija', amount: 200, transType: 'credit', date: '01/02/2019'},
  //   {name: 'Sindhu', amount: 200, transType: 'credit', date: '01/02/2019'},
  //   {name: 'Anas', amount: 200, transType: 'debit', date: '01/02/2019'}
  // ];
  private transSub: Subscription;
  alertMessage = 'Are you sure you want to delete the transacton ?';

  constructor(private transService: TransacService, private dialog: MatDialog) {}

  ngOnInit() {
    this.transService.getAllTransactions();
    this.transSub = this.transService.getTransUpdateListener()
    .subscribe((transData: {transactions: Transactions[]}) => {
      this.dataSource = transData.transactions;
    }, error => {
      console.log(error);
    });

  }

  ngOnDestroy() {
    this.transSub.unsubscribe();
  }

  getTotalCost() {
    const totalCredited: any = this.dataSource.reduce((amount, trans) => {
      amount[trans.transType] = amount[trans.transType] + trans.amount || trans.amount;
      return amount;
    }, {});
    if ( totalCredited.credit === undefined) {
      totalCredited.credit = 0;
    } else if (totalCredited.debit === undefined) {
      totalCredited.debit = 0;
    }
    return totalCredited.credit - totalCredited.debit;
  }

  onDeleteTransactions(transaction) {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {message: this.alertMessage}
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        this.transService.deleteTransaction(transaction._id);
        this.transSub = this.transService.getTransUpdateListener()
        .subscribe((transData: {transactions: Transactions[]}) => {
          this.dataSource = transData.transactions;
        }, error => {
          console.log(error);
        });
      } else {
        return;
      }
    });
  }
}
