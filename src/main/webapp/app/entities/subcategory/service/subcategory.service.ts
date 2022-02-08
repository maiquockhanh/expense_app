import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISubcategory, getSubcategoryIdentifier } from '../subcategory.model';

export type EntityResponseType = HttpResponse<ISubcategory>;
export type EntityArrayResponseType = HttpResponse<ISubcategory[]>;

@Injectable({ providedIn: 'root' })
export class SubcategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/subcategories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(subcategory: ISubcategory): Observable<EntityResponseType> {
    return this.http.post<ISubcategory>(this.resourceUrl, subcategory, { observe: 'response' });
  }

  update(subcategory: ISubcategory): Observable<EntityResponseType> {
    return this.http.put<ISubcategory>(`${this.resourceUrl}/${getSubcategoryIdentifier(subcategory) as number}`, subcategory, {
      observe: 'response',
    });
  }

  partialUpdate(subcategory: ISubcategory): Observable<EntityResponseType> {
    return this.http.patch<ISubcategory>(`${this.resourceUrl}/${getSubcategoryIdentifier(subcategory) as number}`, subcategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubcategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubcategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSubcategoryToCollectionIfMissing(
    subcategoryCollection: ISubcategory[],
    ...subcategoriesToCheck: (ISubcategory | null | undefined)[]
  ): ISubcategory[] {
    const subcategories: ISubcategory[] = subcategoriesToCheck.filter(isPresent);
    if (subcategories.length > 0) {
      const subcategoryCollectionIdentifiers = subcategoryCollection.map(subcategoryItem => getSubcategoryIdentifier(subcategoryItem)!);
      const subcategoriesToAdd = subcategories.filter(subcategoryItem => {
        const subcategoryIdentifier = getSubcategoryIdentifier(subcategoryItem);
        if (subcategoryIdentifier == null || subcategoryCollectionIdentifiers.includes(subcategoryIdentifier)) {
          return false;
        }
        subcategoryCollectionIdentifiers.push(subcategoryIdentifier);
        return true;
      });
      return [...subcategoriesToAdd, ...subcategoryCollection];
    }
    return subcategoryCollection;
  }
}
