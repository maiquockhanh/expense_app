import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expense, IExpense } from '../../entities/expense/expense.model';
import { ExpenseService } from '../../entities/expense/service/expense.service';
import { ExpenseDeleteDialogComponent } from '../../entities/expense/delete/expense-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';
import { Account } from 'app/core/auth/account.model';
import { Company } from 'app/entities/company/company.model';
import { AccountService } from 'app/core/auth/account.service';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { DataService } from '../company-admin.data.service';
import { Status } from 'app/entities/enumerations/status.model';
import { Role } from 'app/entities/enumerations/role.model';
import { ApplicationUser } from 'app/entities/application-user/application-user.model';

@Component({
  selector: 'jhi-expense',
  templateUrl: './expense.component.html',
})
export class ExpenseComponent implements OnInit {
  userLogins: Map<number, string> = new Map<number, string>();
  expenses?: IExpense[];
  account: Account | null = null;
  company: Company | null = null;
  applicationUser: ApplicationUser | null = null;
  isLoading = false;

  constructor(
    protected expenseService: ExpenseService,
    protected applicationUserService: ApplicationUserService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
    private dataService: DataService
  ) {}

  loadAll(): void {
    this.dataService.fetchAll();
    this.dataService.awaitGetCompany().subscribe(company => (this.company = company));
    this.dataService.awaitGetExpense().subscribe(expenses => (this.expenses = expenses));
    this.dataService.awaitGetThisUser().subscribe(user => (this.applicationUser = user));
    this.userLogins = this.dataService.userLogins;
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IExpense): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(expense: IExpense): void {
    const modalRef = this.modalService.open(ExpenseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.expense = expense;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  isApproved(status: Status): boolean {
    return status === Status.APROVED;
  }

  isAdmin(): boolean {
    if (this.applicationUser) {
      return this.applicationUser.role === Role.Administrator;
    }
    return false;
  }

  isPersonal(): boolean {
    if (this.applicationUser) {
      return this.applicationUser.role === Role.Personal;
    }
    return false;
  }

  nextStatus(expense: IExpense): void {
    console.warn({ ...expense, status: Status.APROVED });
    this.expenseService.update({ ...expense, status: Status.APROVED }).subscribe(() => this.loadAll());
  }
}
