import { HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { Company } from 'app/entities/company/company.model';
import { IExpense } from 'app/entities/expense/expense.model';
import { ExpenseService } from 'app/entities/expense/service/expense.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  approversLogins: Map<number, string> = new Map<number, string>();
  userLogins: Map<number, string> = new Map<number, string>();

  private defaultAccount!: Account;
  private defaultCompany!: Company;
  private defaultUsers!: IApplicationUser[];
  private defaultExpenses!: IApplicationUser[];
  private defaultApplicationUsers!: IApplicationUser;
  private accountResource = new BehaviorSubject(this.defaultAccount);
  private companyResource = new BehaviorSubject(this.defaultCompany);
  private usersResource = new BehaviorSubject(this.defaultUsers);
  private expensesResource = new BehaviorSubject(this.defaultExpenses);
  private applicationUserResource = new BehaviorSubject(this.defaultApplicationUsers);

  private fetching!: boolean;

  private account = this.accountResource.asObservable();
  private company = this.companyResource.asObservable();
  private users = this.usersResource.asObservable();
  private expenses = this.expensesResource.asObservable();
  private applicationUser = this.applicationUserResource.asObservable();

  constructor(
    private applicationUserService: ApplicationUserService,
    private accountService: AccountService,
    private expenseService: ExpenseService
  ) {}

  awaitGetAccount(): Observable<Account> {
    if (!this.fetching) {
      this.fetchAll();
    }
    return this.account;
  }

  awaitGetCompany(): Observable<Company> {
    if (!this.fetching) {
      this.fetchAll();
    }
    return this.company;
  }

  awaitGetUsers(): Observable<IApplicationUser[]> {
    if (!this.fetching) {
      this.fetchAll();
    }
    return this.users;
  }

  awaitGetThisUser(): Observable<IApplicationUser> {
    if (!this.fetching) {
      this.fetchAll();
    }
    return this.applicationUser;
  }

  awaitGetExpense(): Observable<IExpense[]> {
    if (!this.fetching) {
      this.fetchAll();
    }
    return this.expenses;
  }

  fetchAll(): void {
    this.fetching = true;
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account) {
        this.fetching = false;
        this.accountResource.next(account);
        this.defaultAccount = account;
        this.fetchCompany();
      }
    });
  }

  fetchCompany(): void {
    this.fetching = true;
    if (this.defaultAccount.id) {
      this.applicationUserService.find(this.defaultAccount.id).subscribe(res => {
        if (res.body?.company?.id) {
          this.fetching = false;
          this.companyResource.next(res.body.company);
          this.applicationUserResource.next(res.body);
          this.defaultCompany = res.body.company;
          this.fetchUser();
          this.fetchExpenses();
        }
      });
    }
  }

  fetchUser(): void {
    this.fetching = true;
    if (this.defaultCompany.id) {
      this.applicationUserService.findByCompanyId(this.defaultCompany.id).subscribe({
        next: (res: HttpResponse<IApplicationUser[]>) => {
          this.fetching = false;
          this.usersResource.next(res.body ?? []);
          this.defaultUsers = res.body ?? [];
          this.setApproverLogins();
        },
        error: () => {
          this.fetching = false;
        },
      });
    }
  }

  fetchExpenses(): void {
    this.fetching = true;
    if (this.defaultCompany.id) {
      this.expenseService.findByCompanyId(this.defaultCompany.id).subscribe({
        next: (res: HttpResponse<IExpense[]>) => {
          this.fetching = false;
          this.expensesResource.next(res.body ?? []);
          this.defaultExpenses = res.body ?? [];
          this.setUserLogins();
        },
        error: () => {
          this.fetching = false;
        },
      });
    }
  }

  getLogin(id: number | undefined): string | undefined {
    return this.defaultUsers.find(element => element.id === id)?.internalUser?.login;
  }

  setApproverLogins(): void {
    this.defaultUsers.forEach(element => {
      const approverLogin = this.getLogin(element.approver?.id);
      if (element.id && approverLogin) {
        this.approversLogins.set(element.id, approverLogin);
      }
    });
  }

  setUserLogins(): void {
    this.defaultUsers.forEach(element => {
      const login = this.getLogin(element.id);
      if (element.id && login) {
        this.userLogins.set(element.id, login);
      }
    });
  }
}
