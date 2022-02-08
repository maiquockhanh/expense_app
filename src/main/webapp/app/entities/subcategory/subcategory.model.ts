import { ICategory } from 'app/entities/category/category.model';

export interface ISubcategory {
  id?: number;
  name?: string | null;
  category?: ICategory | null;
}

export class Subcategory implements ISubcategory {
  constructor(public id?: number, public name?: string | null, public category?: ICategory | null) {}
}

export function getSubcategoryIdentifier(subcategory: ISubcategory): number | undefined {
  return subcategory.id;
}
