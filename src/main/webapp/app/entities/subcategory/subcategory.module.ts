import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SubcategoryComponent } from './list/subcategory.component';
import { SubcategoryDetailComponent } from './detail/subcategory-detail.component';
import { SubcategoryUpdateComponent } from './update/subcategory-update.component';
import { SubcategoryDeleteDialogComponent } from './delete/subcategory-delete-dialog.component';
import { SubcategoryRoutingModule } from './route/subcategory-routing.module';

@NgModule({
  imports: [SharedModule, SubcategoryRoutingModule],
  declarations: [SubcategoryComponent, SubcategoryDetailComponent, SubcategoryUpdateComponent, SubcategoryDeleteDialogComponent],
  entryComponents: [SubcategoryDeleteDialogComponent],
})
export class SubcategoryModule {}
