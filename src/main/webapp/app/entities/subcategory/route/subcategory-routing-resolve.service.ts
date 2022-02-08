import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISubcategory, Subcategory } from '../subcategory.model';
import { SubcategoryService } from '../service/subcategory.service';

@Injectable({ providedIn: 'root' })
export class SubcategoryRoutingResolveService implements Resolve<ISubcategory> {
  constructor(protected service: SubcategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubcategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((subcategory: HttpResponse<Subcategory>) => {
          if (subcategory.body) {
            return of(subcategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Subcategory());
  }
}
