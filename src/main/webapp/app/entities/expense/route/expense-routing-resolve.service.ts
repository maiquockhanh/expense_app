import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IExpense, Expense } from '../expense.model';
import { ExpenseService } from '../service/expense.service';

@Injectable({ providedIn: 'root' })
export class ExpenseRoutingResolveService implements Resolve<IExpense> {
  constructor(protected service: ExpenseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExpense> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((expense: HttpResponse<Expense>) => {
          if (expense.body) {
            return of(expense.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Expense());
  }
}
