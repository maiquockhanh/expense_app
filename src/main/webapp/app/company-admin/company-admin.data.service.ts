import { HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { ICategory } from 'app/entities/category/category.model';
import { CategoryService } from 'app/entities/category/service/category.service';
import { Company } from 'app/entities/company/company.model';
import { Role } from 'app/entities/enumerations/role.model';
import { IExpense } from 'app/entities/expense/expense.model';
import { EntityArrayResponseType, ExpenseService } from 'app/entities/expense/service/expense.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  approversLogins: Map<number, string> = new Map<number, string>();
  userLogins: Map<number, string> = new Map<number, string>();

  private defaultAccount!: Account;
  private defaultCompany!: Company;
  private defaultUsers!: IApplicationUser[];
  private defaultExpenses!: IApplicationUser[];
  private defaultCategories!: ICategory[];
  private defaultApplicationUser!: IApplicationUser;
  private accountResource = new BehaviorSubject(this.defaultAccount);
  private companyResource = new BehaviorSubject(this.defaultCompany);
  private usersResource = new BehaviorSubject(this.defaultUsers);
  private expensesResource = new BehaviorSubject(this.defaultExpenses);
  private categoriesResource = new BehaviorSubject(this.defaultCategories);
  private applicationUserResource = new BehaviorSubject(this.defaultApplicationUser);

  private fetching!: boolean;

  private account = this.accountResource.asObservable();
  private company = this.companyResource.asObservable();
  private users = this.usersResource.asObservable();
  private expenses = this.expensesResource.asObservable();
  private categories = this.categoriesResource.asObservable();
  private applicationUser = this.applicationUserResource.asObservable();

  constructor(
    private applicationUserService: ApplicationUserService,
    private accountService: AccountService,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
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

  awaitGetCategories(): Observable<ICategory[]> {
    if (!this.fetching) {
      this.fetchAll();
    }
    return this.categories;
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
          this.defaultApplicationUser = res.body;
          this.fetchUser();
          this.fetchCategory();
          this.fetching = true;
          if (this.defaultApplicationUser.role === Role.Administrator) {
            this.company.subscribe(company => {
              this.fetching = false;
              if (company.id) {
                this.fetchExpenses(this.expenseService.findByCompanyId(company.id));
              }
            });
          } else if (this.defaultApplicationUser.role === Role.Personal) {
            this.account.subscribe(account => {
              this.fetching = false;
              if (account.id) {
                this.fetchExpenses(this.expenseService.findByUserId(account.id));
              }
            });
          } else if (this.defaultApplicationUser.role === Role.Approver) {
            this.applicationUser.subscribe(user => {
              this.fetching = false;
              if (user.id) {
                this.fetchExpenses(this.expenseService.findByApproverId(user.id));
              }
            });
          }
        }
      });
    }
  }

  fetchCategory(): void {
    this.fetching = true;
    this.company.subscribe(company => {
      if (company.id) {
        this.categoryService.findByCompanyId(company.id).subscribe({
          next: (res: HttpResponse<ICategory[]>) => {
            this.fetching = false;
            this.categoriesResource.next(res.body ?? []);
            this.defaultCategories = res.body ?? [];
          },
          error: () => {
            this.fetching = false;
          },
        });
      }
    });
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
          this.setUserLogins();
        },
        error: () => {
          this.fetching = false;
        },
      });
    }
  }

  fetchExpenses(findBy: Observable<EntityArrayResponseType>): void {
    this.fetching = true;
    findBy.subscribe({
      next: (res: HttpResponse<IExpense[]>) => {
        this.fetching = false;
        this.expensesResource.next(res.body ?? []);
        this.defaultExpenses = res.body ?? [];
      },
      error: () => {
        this.fetching = false;
      },
    });
  }

  getLogin(id: number | undefined): string | undefined {
    return this.defaultUsers.find(element => element.id === id)?.internalUser?.login;
  }

  setApproverLogins(): void {
    this.users.subscribe(users => {
      users.forEach(element => {
        const approverLogin = users.find(e => e.id === element.approver?.id)?.internalUser?.login;
        if (element.id && approverLogin) {
          this.approversLogins.set(element.id, approverLogin);
        }
      });
    });
  }

  setUserLogins(): void {
    this.users.subscribe(users => {
      users.forEach(element => {
        //const login = this.getLogin(element.id);
        const login = users.find(e => e.id === element.id)?.internalUser?.login;
        if (element.id && login) {
          this.userLogins.set(element.id, login);
        }
      });
    });
  }
}
