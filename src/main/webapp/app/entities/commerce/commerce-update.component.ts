import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICommerce, Commerce } from 'app/shared/model/commerce.model';
import { CommerceService } from './commerce.service';
import { IPanier } from 'app/shared/model/panier.model';
import { PanierService } from 'app/entities/panier/panier.service';

@Component({
  selector: 'jhi-commerce-update',
  templateUrl: './commerce-update.component.html',
})
export class CommerceUpdateComponent implements OnInit {
  isSaving = false;
  paniers: IPanier[] = [];

  editForm = this.fb.group({
    id: [],
    adresse: [null, [Validators.required]],
    noteCommerce: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    name: [null, [Validators.required]],
    panier: [],
  });

  constructor(
    protected commerceService: CommerceService,
    protected panierService: PanierService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commerce }) => {
      this.updateForm(commerce);

      this.panierService.query().subscribe((res: HttpResponse<IPanier[]>) => (this.paniers = res.body || []));
    });
  }

  updateForm(commerce: ICommerce): void {
    this.editForm.patchValue({
      id: commerce.id,
      adresse: commerce.adresse,
      noteCommerce: commerce.noteCommerce,
      name: commerce.name,
      panier: commerce.panier,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commerce = this.createFromForm();
    if (commerce.id !== undefined) {
      this.subscribeToSaveResponse(this.commerceService.update(commerce));
    } else {
      this.subscribeToSaveResponse(this.commerceService.create(commerce));
    }
  }

  private createFromForm(): ICommerce {
    return {
      ...new Commerce(),
      id: this.editForm.get(['id'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      noteCommerce: this.editForm.get(['noteCommerce'])!.value,
      name: this.editForm.get(['name'])!.value,
      panier: this.editForm.get(['panier'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommerce>>): void {
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

  trackById(index: number, item: IPanier): any {
    return item.id;
  }
}
