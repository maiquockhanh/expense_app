import { ICompany } from 'app/entities/company/company.model';
import { Role } from 'app/entities/enumerations/role.model';

export class Registration {
  constructor(
    public login: string,
    public email: string,
    public password: string,
    public langKey: string,
    public company: ICompany,
    public role: Role
  ) {}
}
