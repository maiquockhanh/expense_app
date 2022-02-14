import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApplicationUserRoutingResolveService } from 'app/entities/application-user/route/application-user-routing-resolve.service';
import { CompanyUserEditComponent } from './company-user-edit/company-user-edit.component';
import { CompanyUserComponent } from './company-user/company-user.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAdminRoutingModule {}
