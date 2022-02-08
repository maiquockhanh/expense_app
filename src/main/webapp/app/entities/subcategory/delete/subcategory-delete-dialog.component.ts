import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubcategory } from '../subcategory.model';
import { SubcategoryService } from '../service/subcategory.service';

@Component({
  templateUrl: './subcategory-delete-dialog.component.html',
})
export class SubcategoryDeleteDialogComponent {
  subcategory?: ISubcategory;

  constructor(protected subcategoryService: SubcategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subcategoryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
