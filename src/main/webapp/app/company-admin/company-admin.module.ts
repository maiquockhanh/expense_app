import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import { CompanyUserComponent } from './company-user/company-user.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [CompanyUserComponent],
  imports: [CommonModule, SharedModule, CompanyAdminRoutingModule],
})
export class CompanyAdminModule {}
