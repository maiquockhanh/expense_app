import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IExpense, Expense } from '../../entities/expense/expense.model';
import { ExpenseService } from '../../entities/expense/service/expense.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { Company, ICompany } from 'app/entities/company/company.model';
import { CompanyService } from 'app/entities/company/service/company.service';
import { ApplicationUser, IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { Status } from 'app/entities/enumerations/status.model';
import { Method } from 'app/entities/enumerations/method.model';
import { DataService } from '../company-admin.data.service';
import dayjs from 'dayjs';

@Component({
  selector: 'jhi-update-expense',
  templateUrl: './update-expense.component.html',
})
export class UpdateExpenseComponent implements OnInit {
  isSaving = false;
  statusValues = Object.keys(Status);
  methodValues = Object.keys(Method);

  categoriesCollection: ICategory[] = [];
  company: Company | null = null;
  user: ApplicationUser | null = null;

  editForm = this.fb.group({
    id: [],
    date: [],
    merchant: [],
    amount: [],
    status: [],
    paymentMethod: [],
    refNo: [],
    image: [],
    imageContentType: [],
    category: [],
    company: [],
    applicationUser: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected expenseService: ExpenseService,
    protected categoryService: CategoryService,
    protected companyService: CompanyService,
    protected applicationUserService: ApplicationUserService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected dataService: DataService,
    protected http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res => {
      console.warn(res);

      this.updateForm(res.expense);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    const file = (event.target as HTMLInputElement).files![0];
    const formData: any = new FormData();
    formData.append('file', file);

    this.http.post('https://ocr.asprise.com/api/v1/receipt', formData).subscribe({
      next: response => {
        console.warn();
        this.editForm.patchValue({
          id: this.editForm.get(['id'])!.value,
          date: Object.values(response)[9][0]['date'],
          merchant: Object.values(response)[9][0]['merchant_name'],
          amount: Object.values(response)[9][0]['total'],
          status: this.editForm.get(['id'])!.value,
          paymentMethod: Method.Cash,
          refNo: Object.values(response)[9][0]['receipt_no'],
          image: this.editForm.get(['id'])!.value,
          imageContentType: this.editForm.get(['id'])!.value,
          category: this.editForm.get(['id'])!.value,
          company: this.editForm.get(['id'])!.value,
          applicationUser: this.editForm.get(['id'])!.value,
        });
      },
      error: error => console.warn('fail', error),
    });

    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('expenseApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const expense = this.createFromForm();
    if (expense.id !== undefined) {
      this.subscribeToSaveResponse(this.expenseService.update(expense));
    } else {
      expense.status = Status.WAITING_FOR_APPROVAL;
      this.subscribeToSaveResponse(this.expenseService.create(expense));
    }
  }

  trackCategoryById(index: number, item: ICategory): number {
    return item.id!;
  }

  trackCompanyById(index: number, item: ICompany): number {
    return item.id!;
  }

  trackApplicationUserById(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpense>>): void {
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

  protected updateForm(expense: IExpense): void {
    this.editForm.patchValue({
      id: expense.id,
      date: expense.date,
      merchant: expense.merchant,
      amount: expense.amount,
      status: expense.status,
      paymentMethod: expense.paymentMethod,
      refNo: expense.refNo,
      image: expense.image,
      imageContentType: expense.imageContentType,
      category: expense.category,
      company: expense.company,
      applicationUser: expense.applicationUser,
    });
  }

  protected loadRelationshipsOptions(): void {
    this.dataService.awaitGetCategories().subscribe(cats => (this.categoriesCollection = cats));

    this.dataService.awaitGetCompany().subscribe(company => (this.company = company));

    this.dataService.awaitGetThisUser().subscribe(user => (this.user = user));
  }

  protected createFromForm(): IExpense {
    return {
      ...new Expense(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      merchant: this.editForm.get(['merchant'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      status: this.editForm.get(['status'])!.value,
      paymentMethod: this.editForm.get(['paymentMethod'])!.value,
      refNo: this.editForm.get(['refNo'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      category: this.editForm.get(['category'])!.value,
      company: this.company,
      applicationUser: this.user,
    };
  }
}
