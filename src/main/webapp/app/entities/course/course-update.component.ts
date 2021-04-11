import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { ICoursier } from 'app/shared/model/coursier.model';
import { CoursierService } from 'app/entities/coursier/coursier.service';
import { IPanier } from 'app/shared/model/panier.model';
import { PanierService } from 'app/entities/panier/panier.service';

type SelectableEntity = ICoursier | IPanier;

@Component({
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html',
})
export class CourseUpdateComponent implements OnInit {
  isSaving = false;
  coursiers: ICoursier[] = [];
  paniers: IPanier[] = [];
  coursiers: ICoursier[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    prix: [null, [Validators.required, Validators.min(0)]],
    distance: [null, [Validators.required]],
    date: [null, [Validators.required]],
    coursier: [],
    panier: [],
    coursier: [],
  });

  constructor(
    protected courseService: CourseService,
    protected coursierService: CoursierService,
    protected panierService: PanierService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);

      this.coursierService
        .query({ filter: 'course-is-null' })
        .pipe(
          map((res: HttpResponse<ICoursier[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICoursier[]) => {
          if (!course.coursier || !course.coursier.id) {
            this.coursiers = resBody;
          } else {
            this.coursierService
              .find(course.coursier.id)
              .pipe(
                map((subRes: HttpResponse<ICoursier>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICoursier[]) => (this.coursiers = concatRes));
          }
        });

      this.panierService.query().subscribe((res: HttpResponse<IPanier[]>) => (this.paniers = res.body || []));

      this.coursierService.query().subscribe((res: HttpResponse<ICoursier[]>) => (this.coursiers = res.body || []));
    });
  }

  updateForm(course: ICourse): void {
    this.editForm.patchValue({
      id: course.id,
      prix: course.prix,
      distance: course.distance,
      date: course.date,
      coursier: course.coursier,
      panier: course.panier,
      coursier: course.coursier,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  private createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id'])!.value,
      prix: this.editForm.get(['prix'])!.value,
      distance: this.editForm.get(['distance'])!.value,
      date: this.editForm.get(['date'])!.value,
      coursier: this.editForm.get(['coursier'])!.value,
      panier: this.editForm.get(['panier'])!.value,
      coursier: this.editForm.get(['coursier'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
