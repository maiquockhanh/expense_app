import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IApplicationUser, ApplicationUser } from '../../entities/application-user/application-user.model';
import { ApplicationUserService } from '../../entities/application-user/service/application-user.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { ICompany } from 'app/entities/company/company.model';
import { CompanyService } from 'app/entities/company/service/company.service';
import { Role } from 'app/entities/enumerations/role.model';

@Component({
  selector: 'jhi-company-user-edit',
  templateUrl: './company-user-edit.component.html',
})
export class CompanyUserEditComponent implements OnInit {
  isSaving = false;
  roleValues = Object.keys(Role);

  usersSharedCollection: IUser[] = [];
  applicationUsersSharedCollection: IApplicationUser[] = [];
  companiesSharedCollection: ICompany[] = [];

  editForm = this.fb.group({
    id: [],
    role: [],
    internalUser: [],
    approver: [],
    company: [],
  });

  constructor(
    protected applicationUserService: ApplicationUserService,
    protected userService: UserService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ applicationUser }) => {
      this.updateForm(applicationUser);

      this.loadRelationshipsOptions(applicationUser);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const applicationUser = this.createFromForm();
    if (applicationUser.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationUserService.update(applicationUser));
    } else {
      this.subscribeToSaveResponse(this.applicationUserService.create(applicationUser));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  trackApplicationUserById(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  trackCompanyById(index: number, item: ICompany): number {
    return item.id!;
  }

  isPersonal(applicationUser: ApplicationUser): boolean {
    return applicationUser.role === Role.Personal;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(applicationUser: IApplicationUser): void {
    this.editForm.patchValue({
      id: applicationUser.id,
      role: applicationUser.role,
      internalUser: applicationUser.internalUser,
      approver: applicationUser.approver,
      company: applicationUser.company,
    });
  }

  protected loadRelationshipsOptions(applicationUser: IApplicationUser): void {
    if (applicationUser.company?.id) {
      this.applicationUserService
        .findByCompanyId(applicationUser.company.id)
        .pipe(map((res: HttpResponse<IApplicationUser[]>) => res.body ?? []))
        .pipe(
          map((applicationUsers: IApplicationUser[]) =>
            this.applicationUserService.addApplicationUserToCollectionIfMissing(applicationUsers, this.editForm.get('approver')!.value)
          )
        )
        .subscribe((applicationUsers: IApplicationUser[]) => (this.applicationUsersSharedCollection = applicationUsers));
    }
  }
  protected createFromForm(): IApplicationUser {
    return {
      ...new ApplicationUser(),
      id: this.editForm.get(['id'])!.value,
      role: this.editForm.get(['role'])!.value,
      internalUser: this.editForm.get(['internalUser'])!.value,
      approver: this.editForm.get(['approver'])!.value,
      company: this.editForm.get(['company'])!.value,
    };
  }
}
