import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'app/admin/user-management/service/user-management.service';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ApplicationUser, IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { Company } from 'app/entities/company/company.model';
import { Role } from 'app/entities/enumerations/role.model';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../company-admin.data.service';

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
  constructor(
    protected applicationUserService: ApplicationUserService,
    private dataService: DataService,
    protected userService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.dataService.awaitGetUsers().subscribe(users => (this.applicationUsers = users));
    this.dataService.awaitGetCompany().subscribe(company => (this.company = company));
    this.approverLogins = this.dataService.approversLogins;
  }

  activateUser(user: IApplicationUser): void {
    // console.warn(user.internalUser);
    this.userService.update({ ...user.internalUser, activated: true }).subscribe(() => this.loadAll());
  }

  trackId(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  isAdmin(applicationUser: ApplicationUser): boolean {
    return applicationUser.role === Role.Administrator;
  }
}
