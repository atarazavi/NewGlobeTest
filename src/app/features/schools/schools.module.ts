import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsComponent } from './schools.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolBatteriesDataStore } from './store/school-batteries-data.store';
import { MaterialDesignModule } from 'src/app/shared/materialdesign/materialdesign.module';

@NgModule({
  declarations: [
    SchoolsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialDesignModule,
  ],
  exports: [
    SchoolsComponent,
  ],
  providers: [
    SchoolBatteriesDataStore,
  ],
})
export class SchoolsModule { }
