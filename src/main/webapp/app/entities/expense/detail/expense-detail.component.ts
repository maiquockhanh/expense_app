import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpense } from '../expense.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-expense-detail',
  templateUrl: './expense-detail.component.html',
})
export class ExpenseDetailComponent implements OnInit {
  expense: IExpense | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ expense }) => {
      this.expense = expense;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
