import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserEditComponent } from './company-user-edit.component';

describe('CompanyUserEditComponent', () => {
  let component: CompanyUserEditComponent;
  let fixture: ComponentFixture<CompanyUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyUserEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
