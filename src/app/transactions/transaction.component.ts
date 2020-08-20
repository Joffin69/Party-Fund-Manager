import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TransacService } from './transactions.service';

@Component({
  selector: 'app-trans',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  transType: string;
  constructor(private tranService: TransacService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      if (!form.value.credit && !form.value.debit) {
        return;
      } else {
        if (!!form.form.controls.debit.errors) {
          if (!form.value.credit) {
            return;
          }
        } else if (!!form.form.controls.credit.errors) {
          if (!form.value.debit) {
            return;
          }
        }
      }
    }
    if (!form.value.credit && !form.value.debit) {
      return;
    }
    if (form.value.credit === true) {
       this.transType = 'credit';
    } else {
      this.transType = 'debit';
    }
    if (!form.value.comments) {
      form.value.comments = '';
    }
    this.tranService.addTransaction(form.value.transname, form.value.amount, this.transType, form.value.transDate.toDateString(),
     form.value.comments);
  }
}
