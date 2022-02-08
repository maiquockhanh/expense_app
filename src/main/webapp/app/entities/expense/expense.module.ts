import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ExpenseComponent } from './list/expense.component';
import { ExpenseDetailComponent } from './detail/expense-detail.component';
import { ExpenseUpdateComponent } from './update/expense-update.component';
import { ExpenseDeleteDialogComponent } from './delete/expense-delete-dialog.component';
import { ExpenseRoutingModule } from './route/expense-routing.module';

@NgModule({
  imports: [SharedModule, ExpenseRoutingModule],
  declarations: [ExpenseComponent, ExpenseDetailComponent, ExpenseUpdateComponent, ExpenseDeleteDialogComponent],
  entryComponents: [ExpenseDeleteDialogComponent],
})
export class ExpenseModule {}
