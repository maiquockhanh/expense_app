import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SubcategoryComponent } from '../list/subcategory.component';
import { SubcategoryDetailComponent } from '../detail/subcategory-detail.component';
import { SubcategoryUpdateComponent } from '../update/subcategory-update.component';
import { SubcategoryRoutingResolveService } from './subcategory-routing-resolve.service';

const subcategoryRoute: Routes = [
  {
    path: '',
    component: SubcategoryComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubcategoryDetailComponent,
    resolve: {
      subcategory: SubcategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubcategoryUpdateComponent,
    resolve: {
      subcategory: SubcategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubcategoryUpdateComponent,
    resolve: {
      subcategory: SubcategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(subcategoryRoute)],
  exports: [RouterModule],
})
export class SubcategoryRoutingModule {}
