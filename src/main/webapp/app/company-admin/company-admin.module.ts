import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyUserComponent } from './company-user/company-user.component';
import { SharedModule } from 'app/shared/shared.module';
import { CompanyAdminRoutingModule } from './company-admin-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, CompanyAdminRoutingModule],
  declarations: [CompanyUserComponent],
})
export class CompanyAdminModule {}
