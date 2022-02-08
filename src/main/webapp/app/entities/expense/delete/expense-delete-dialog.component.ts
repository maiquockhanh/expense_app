import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IExpense } from '../expense.model';
import { ExpenseService } from '../service/expense.service';

@Component({
  templateUrl: './expense-delete-dialog.component.html',
})
export class ExpenseDeleteDialogComponent {
  expense?: IExpense;

  constructor(protected expenseService: ExpenseService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.expenseService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
