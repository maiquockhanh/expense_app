import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SubcategoryService } from '../service/subcategory.service';

import { SubcategoryComponent } from './subcategory.component';

describe('Subcategory Management Component', () => {
  let comp: SubcategoryComponent;
  let fixture: ComponentFixture<SubcategoryComponent>;
  let service: SubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubcategoryComponent],
    })
      .overrideTemplate(SubcategoryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubcategoryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SubcategoryService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.subcategories?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
