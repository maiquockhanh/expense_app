import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IApplicationUser } from '../application-user.model';
import { ApplicationUserService } from '../service/application-user.service';
import { ApplicationUserDeleteDialogComponent } from '../delete/application-user-delete-dialog.component';

@Component({
  selector: 'jhi-application-user',
  templateUrl: './application-user.component.html',
})
export class ApplicationUserComponent implements OnInit {
  applicationUsers?: IApplicationUser[];
  isLoading = false;

  constructor(protected applicationUserService: ApplicationUserService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.applicationUserService.query().subscribe({
      next: (res: HttpResponse<IApplicationUser[]>) => {
        this.isLoading = false;
        this.applicationUsers = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IApplicationUser): number {
    return item.id!;
  }

  delete(applicationUser: IApplicationUser): void {
    const modalRef = this.modalService.open(ApplicationUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.applicationUser = applicationUser;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
