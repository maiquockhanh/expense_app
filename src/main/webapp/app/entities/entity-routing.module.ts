import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'application-user',
        data: { pageTitle: 'expenseApp.applicationUser.home.title' },
        loadChildren: () => import('./application-user/application-user.module').then(m => m.ApplicationUserModule),
      },
      {
        path: 'company',
        data: { pageTitle: 'expenseApp.company.home.title' },
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
      },
      {
        path: 'category',
        data: { pageTitle: 'expenseApp.category.home.title' },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'subcategory',
        data: { pageTitle: 'expenseApp.subcategory.home.title' },
        loadChildren: () => import('./subcategory/subcategory.module').then(m => m.SubcategoryModule),
      },
      {
        path: 'expense',
        data: { pageTitle: 'expenseApp.expense.home.title' },
        loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
