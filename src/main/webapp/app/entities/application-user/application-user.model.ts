import { IUser } from 'app/entities/user/user.model';
import { IExpense } from 'app/entities/expense/expense.model';
import { ICompany } from 'app/entities/company/company.model';
import { Role } from 'app/entities/enumerations/role.model';

export interface IApplicationUser {
  id?: number;
  role?: Role | null;
  internalUser?: IUser | null;
  expenses?: IExpense[] | null;
  approver?: IApplicationUser | null;
  company?: ICompany | null;
}

export class ApplicationUser implements IApplicationUser {
  constructor(
    public id?: number,
    public role?: Role | null,
    public internalUser?: IUser | null,
    public expenses?: IExpense[] | null,
    public approver?: IApplicationUser | null,
    public company?: ICompany | null
  ) {}
}

export function getApplicationUserIdentifier(applicationUser: IApplicationUser): number | undefined {
  return applicationUser.id;
}
