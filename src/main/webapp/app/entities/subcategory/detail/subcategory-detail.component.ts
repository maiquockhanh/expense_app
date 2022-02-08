import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubcategory } from '../subcategory.model';

@Component({
  selector: 'jhi-subcategory-detail',
  templateUrl: './subcategory-detail.component.html',
})
export class SubcategoryDetailComponent implements OnInit {
  subcategory: ISubcategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subcategory }) => {
      this.subcategory = subcategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
