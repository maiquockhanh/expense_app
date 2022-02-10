import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { Company } from 'app/entities/company/company.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  company: Company | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private applicationUserService: ApplicationUserService, private router: Router) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        this.getCompany();
      });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.company = null;
  }

  private getCompany(): void {
    if (this.account?.id) {
      this.applicationUserService.find(this.account.id).subscribe(res => {
        if (res.body?.company) {
          this.company = res.body.company;
        }
      });
    }
  }
}
