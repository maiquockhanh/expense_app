import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubcategoryDetailComponent } from './subcategory-detail.component';

describe('Subcategory Management Detail Component', () => {
  let comp: SubcategoryDetailComponent;
  let fixture: ComponentFixture<SubcategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ subcategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SubcategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SubcategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load subcategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.subcategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
