import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ApplicationUser, IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { Company } from 'app/entities/company/company.model';
import { Role } from 'app/entities/enumerations/role.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'jhi-company-user',
  templateUrl: './company-user.component.html',
})
export class CompanyUserComponent implements OnInit {
  applicationUsers: IApplicationUser[] = [];
  approverLogins: Map<number, string> = new Map<number, string>();
  account: Account | null = null;
  company: Company | null = null;
  isLoading = false;
  private readonly destroy$ = new Subject<void>();
  constructor(protected applicationUserService: ApplicationUserService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        this.getCompany();
      });
  }

  loadAll(): void {
    if (this.company?.id) {
      this.applicationUserService.findByCompanyId(this.company.id).subscribe({
        next: (res: HttpResponse<IApplicationUser[]>) => {
          this.isLoading = false;
          this.applicationUsers = res.body ?? [];
          this.setApproverLogins();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  trackId(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  getLogin(id: number | undefined): string | undefined {
    return this.applicationUsers.find(element => element.id === id)?.internalUser?.login;
  }

  setApproverLogins(): void {
    console.warn(this.applicationUsers);
    this.applicationUsers.forEach(element => {
      const approverLogin = this.getLogin(element.approver?.id);
      if (element.id && approverLogin) {
        this.approverLogins.set(element.id, approverLogin);
      }
    });
  }

  isAdmin(applicationUser: ApplicationUser): boolean {
    return applicationUser.role === Role.Administrator;
  }

  private getCompany(): void {
    if (this.account?.id) {
      this.applicationUserService.find(this.account.id).subscribe(res => {
        if (res.body?.company?.id) {
          this.company = res.body.company;
          this.loadAll();
        }
      });
    }
  }
}
