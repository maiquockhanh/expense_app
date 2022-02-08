import { ISubcategory } from 'app/entities/subcategory/subcategory.model';
import { IExpense } from 'app/entities/expense/expense.model';
import { ICompany } from 'app/entities/company/company.model';

export interface ICategory {
  id?: number;
  name?: string | null;
  subcategories?: ISubcategory[] | null;
  expense?: IExpense | null;
  company?: ICompany | null;
}

export class Category implements ICategory {
  constructor(
    public id?: number,
    public name?: string | null,
    public subcategories?: ISubcategory[] | null,
    public expense?: IExpense | null,
    public company?: ICompany | null
  ) {}
}

export function getCategoryIdentifier(category: ICategory): number | undefined {
  return category.id;
}
