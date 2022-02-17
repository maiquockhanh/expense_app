import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyUserComponent } from './company-user/company-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import { CompanyUserEditComponent } from './company-user-edit/company-user-edit.component';
import { ExpenseComponent } from './expense/expense.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import { CategoryComponent } from './category/category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

@NgModule({
  imports: [CommonModule, SharedModule, CompanyAdminRoutingModule],
  declarations: [
    CompanyUserComponent,
    CompanyUserEditComponent,
    ExpenseComponent,
    UpdateExpenseComponent,
    CategoryComponent,
    UpdateCategoryComponent,
  ],
})
export class CompanyAdminModule {}
