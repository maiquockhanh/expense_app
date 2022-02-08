import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ICategory } from 'app/entities/category/category.model';
import { IExpense } from 'app/entities/expense/expense.model';

export interface ICompany {
  id?: number;
  name?: string | null;
  companyId?: string | null;
  applicationUsers?: IApplicationUser[] | null;
  categories?: ICategory[] | null;
  expenses?: IExpense[] | null;
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public name?: string | null,
    public companyId?: string | null,
    public applicationUsers?: IApplicationUser[] | null,
    public categories?: ICategory[] | null,
    public expenses?: IExpense[] | null
  ) {}
}

export function getCompanyIdentifier(company: ICompany): number | undefined {
  return company.id;
}
