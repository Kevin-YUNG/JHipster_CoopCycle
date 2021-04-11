import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JHipsterSharedModule } from 'app/shared/shared.module';
import { CoursierComponent } from './coursier.component';
import { CoursierDetailComponent } from './coursier-detail.component';
import { CoursierUpdateComponent } from './coursier-update.component';
import { CoursierDeleteDialogComponent } from './coursier-delete-dialog.component';
import { coursierRoute } from './coursier.route';

@NgModule({
  imports: [JHipsterSharedModule, RouterModule.forChild(coursierRoute)],
  declarations: [CoursierComponent, CoursierDetailComponent, CoursierUpdateComponent, CoursierDeleteDialogComponent],
  entryComponents: [CoursierDeleteDialogComponent],
})
export class JHipsterCoursierModule {}
