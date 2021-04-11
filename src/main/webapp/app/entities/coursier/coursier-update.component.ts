import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICoursier, Coursier } from 'app/shared/model/coursier.model';
import { CoursierService } from './coursier.service';

@Component({
  selector: 'jhi-coursier-update',
  templateUrl: './coursier-update.component.html',
})
export class CoursierUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    firstname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    mail: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    reviews: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  constructor(protected coursierService: CoursierService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coursier }) => {
      this.updateForm(coursier);
    });
  }

  updateForm(coursier: ICoursier): void {
    this.editForm.patchValue({
      id: coursier.id,
      firstname: coursier.firstname,
      lastname: coursier.lastname,
      mail: coursier.mail,
      phone: coursier.phone,
      reviews: coursier.reviews,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coursier = this.createFromForm();
    if (coursier.id !== undefined) {
      this.subscribeToSaveResponse(this.coursierService.update(coursier));
    } else {
      this.subscribeToSaveResponse(this.coursierService.create(coursier));
    }
  }

  private createFromForm(): ICoursier {
    return {
      ...new Coursier(),
      id: this.editForm.get(['id'])!.value,
      firstname: this.editForm.get(['firstname'])!.value,
      lastname: this.editForm.get(['lastname'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      reviews: this.editForm.get(['reviews'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoursier>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
