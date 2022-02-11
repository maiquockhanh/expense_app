import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { StateStorageService } from './state-storage.service';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';
import { HttpResponse } from '@angular/common/http';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { Role } from 'app/entities/enumerations/role.model';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({ providedIn: 'root' })
export class AdminRouteAccessService implements CanActivate {
  constructor(
    private applicationUserService: ApplicationUserService,
    private accountService: AccountService,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          this.applicationUserService.find(account.id).subscribe(res => {
            if (res.body?.role === Role.Administrator) {
            } else {
            }
          });
        }
        return true;
      })
    );
  }
}
