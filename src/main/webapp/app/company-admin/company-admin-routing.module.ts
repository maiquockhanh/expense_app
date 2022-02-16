import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApplicationUserRoutingResolveService } from 'app/entities/application-user/route/application-user-routing-resolve.service';
import { ExpenseRoutingResolveService } from 'app/entities/expense/route/expense-routing-resolve.service';
import { CompanyUserEditComponent } from './company-user-edit/company-user-edit.component';
import { CompanyUserComponent } from './company-user/company-user.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import { ExpenseComponent } from './expense/expense.component';

const routes: Routes = [
  {
    path: 'user',
    component: CompanyUserComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      applicationUser: ApplicationUserRoutingResolveService,
    },
  },
  {
    path: 'user/:id/edit',
    component: CompanyUserEditComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      applicationUser: ApplicationUserRoutingResolveService,
    },
  },
  {
    path: 'expense',
    component: ExpenseComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      expense: ExpenseRoutingResolveService,
    },
  },
  {
    path: 'expense/new',
    component: UpdateExpenseComponent,
    canActivate: [UserRouteAccessService],
    resolve: {
      expense: ExpenseRoutingResolveService,
    },
  },
  {
    path: 'expense/:id/edit',
    component: UpdateExpenseComponent,
    resolve: {
      expense: ExpenseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAdminRoutingModule {}
