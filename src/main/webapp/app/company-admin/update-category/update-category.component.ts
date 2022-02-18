import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICategory, Category } from '../../entities/category/category.model';
import { CategoryService } from '../../entities/category/service/category.service';
import { ICompany } from 'app/entities/company/company.model';
import { CompanyService } from 'app/entities/company/service/company.service';
import { DataService } from '../company-admin.data.service';

@Component({
  selector: 'jhi-update-category',
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent implements OnInit {
  isSaving = false;

  company: ICompany | null = null;

  editForm = this.fb.group({
    id: [],
    name: [],
    company: [],
    subCats: this.fb.array([]),
  });

  constructor(
    protected categoryService: CategoryService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected dataService: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ category }) => {
      this.updateForm(category);
      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const category = this.createFromForm();
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.update(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.create(category));
    }
  }

  trackCompanyById(index: number, item: ICompany): number {
    return item.id!;
  }

  get subCats(): FormArray {
    return this.editForm.controls['subCats'] as FormArray;
  }

  addSub(): void {
    const subEditForm = this.fb.group({
      id: [],
      name: [],
      company: [],
    });

    this.subCats.push(subEditForm);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(category: ICategory): void {
    this.dataService.awaitGetCompany().subscribe(companyRes =>
      this.editForm.patchValue({
        id: category.id,
        name: category.name,
        company: companyRes,
      })
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dataService.awaitGetCompany().subscribe(company => (this.company = company));
  }

  protected createFromForm(): ICategory {
    return {
      ...new Category(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      company: this.editForm.get(['company'])!.value,
    };
  }
}
