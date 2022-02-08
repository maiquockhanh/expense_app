import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISubcategory, Subcategory } from '../subcategory.model';

import { SubcategoryService } from './subcategory.service';

describe('Subcategory Service', () => {
  let service: SubcategoryService;
  let httpMock: HttpTestingController;
  let elemDefault: ISubcategory;
  let expectedResult: ISubcategory | ISubcategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SubcategoryService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Subcategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Subcategory()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Subcategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Subcategory', () => {
      const patchObject = Object.assign({}, new Subcategory());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Subcategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Subcategory', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSubcategoryToCollectionIfMissing', () => {
      it('should add a Subcategory to an empty array', () => {
        const subcategory: ISubcategory = { id: 123 };
        expectedResult = service.addSubcategoryToCollectionIfMissing([], subcategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subcategory);
      });

      it('should not add a Subcategory to an array that contains it', () => {
        const subcategory: ISubcategory = { id: 123 };
        const subcategoryCollection: ISubcategory[] = [
          {
            ...subcategory,
          },
          { id: 456 },
        ];
        expectedResult = service.addSubcategoryToCollectionIfMissing(subcategoryCollection, subcategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Subcategory to an array that doesn't contain it", () => {
        const subcategory: ISubcategory = { id: 123 };
        const subcategoryCollection: ISubcategory[] = [{ id: 456 }];
        expectedResult = service.addSubcategoryToCollectionIfMissing(subcategoryCollection, subcategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subcategory);
      });

      it('should add only unique Subcategory to an array', () => {
        const subcategoryArray: ISubcategory[] = [{ id: 123 }, { id: 456 }, { id: 25145 }];
        const subcategoryCollection: ISubcategory[] = [{ id: 123 }];
        expectedResult = service.addSubcategoryToCollectionIfMissing(subcategoryCollection, ...subcategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const subcategory: ISubcategory = { id: 123 };
        const subcategory2: ISubcategory = { id: 456 };
        expectedResult = service.addSubcategoryToCollectionIfMissing([], subcategory, subcategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subcategory);
        expect(expectedResult).toContain(subcategory2);
      });

      it('should accept null and undefined values', () => {
        const subcategory: ISubcategory = { id: 123 };
        expectedResult = service.addSubcategoryToCollectionIfMissing([], null, subcategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subcategory);
      });

      it('should return initial array if no Subcategory is added', () => {
        const subcategoryCollection: ISubcategory[] = [{ id: 123 }];
        expectedResult = service.addSubcategoryToCollectionIfMissing(subcategoryCollection, undefined, null);
        expect(expectedResult).toEqual(subcategoryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
