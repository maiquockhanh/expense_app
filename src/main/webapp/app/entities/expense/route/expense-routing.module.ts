import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ExpenseComponent } from '../list/expense.component';
import { ExpenseDetailComponent } from '../detail/expense-detail.component';
import { ExpenseUpdateComponent } from '../update/expense-update.component';
import { ExpenseRoutingResolveService } from './expense-routing-resolve.service';

const expenseRoute: Routes = [
  {
    path: '',
    component: ExpenseComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExpenseDetailComponent,
    resolve: {
      expense: ExpenseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExpenseUpdateComponent,
    resolve: {
      expense: ExpenseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExpenseUpdateComponent,
    resolve: {
      expense: ExpenseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(expenseRoute)],
  exports: [RouterModule],
})
export class ExpenseRoutingModule {}
