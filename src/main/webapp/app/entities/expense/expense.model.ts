import dayjs from 'dayjs/esm';
import { ICategory } from 'app/entities/category/category.model';
import { ICompany } from 'app/entities/company/company.model';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { Status } from 'app/entities/enumerations/status.model';
import { Method } from 'app/entities/enumerations/method.model';

export interface IExpense {
  id?: number;
  date?: dayjs.Dayjs | null;
  merchant?: string | null;
  amount?: number | null;
  status?: Status | null;
  paymentMethod?: Method | null;
  refNo?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  category?: ICategory | null;
  company?: ICompany | null;
  applicationUser?: IApplicationUser | null;
}

export class Expense implements IExpense {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs | null,
    public merchant?: string | null,
    public amount?: number | null,
    public status?: Status | null,
    public paymentMethod?: Method | null,
    public refNo?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public category?: ICategory | null,
    public company?: ICompany | null,
    public applicationUser?: IApplicationUser | null
  ) {}
}

export function getExpenseIdentifier(expense: IExpense): number | undefined {
  return expense.id;
}
