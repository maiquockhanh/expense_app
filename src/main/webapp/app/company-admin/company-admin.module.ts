import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyUserComponent } from './company-user/company-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import { CompanyUserEditComponent } from './company-user-edit/company-user-edit.component';
import { ExpenseComponent } from './expense/expense.component';

@NgModule({
  imports: [CommonModule, SharedModule, CompanyAdminRoutingModule],
  declarations: [CompanyUserComponent, CompanyUserEditComponent, ExpenseComponent],
})
export class CompanyAdminModule {}
