import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { CategoryDeleteDialogComponent } from 'app/entities/category/delete/category-delete-dialog.component';
import { DataService } from '../company-admin.data.service';

@Component({
  selector: 'jhi-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  categories?: ICategory[];
  isLoading = false;
  status: Map<number, boolean> = new Map<number, boolean>();

  constructor(protected categoryService: CategoryService, protected modalService: NgbModal, protected dataService: DataService) {}

  loadAll(): void {
    this.isLoading = true;
    this.dataService.awaitGetCategories().subscribe({
      /* eslint-disable */
      next: cats => {
        if (cats) {
          this.categories = cats;
          this.isLoading = false;
          cats.forEach(item => {
            this.status?.set(item.id!, false);
          });
        }
      },
    });
  }

  changeStatus(index: number): void {
    if (this.status) {
      this.status.set(index, !this.status.get(index)!);
    }
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICategory): number {
    return item.id!;
  }

  delete(category: ICategory): void {
    const modalRef = this.modalService.open(CategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.category = category;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
