import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyUserComponent } from './company-user/company-user.component';

const routes: Routes = [
  {
    path: 'user',
    component: CompanyUserComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAdminRoutingModule {}
