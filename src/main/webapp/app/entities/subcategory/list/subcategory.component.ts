import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubcategory } from '../subcategory.model';
import { SubcategoryService } from '../service/subcategory.service';
import { SubcategoryDeleteDialogComponent } from '../delete/subcategory-delete-dialog.component';

@Component({
  selector: 'jhi-subcategory',
  templateUrl: './subcategory.component.html',
})
export class SubcategoryComponent implements OnInit {
  subcategories?: ISubcategory[];
  isLoading = false;

  constructor(protected subcategoryService: SubcategoryService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.subcategoryService.query().subscribe({
      next: (res: HttpResponse<ISubcategory[]>) => {
        this.isLoading = false;
        this.subcategories = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISubcategory): number {
    return item.id!;
  }

  delete(subcategory: ISubcategory): void {
    const modalRef = this.modalService.open(SubcategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subcategory = subcategory;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
