import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsComponent } from './schools.component';
import { BatteryDetailsComponent } from './components/battery-details/battery-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolBatteriesDataStore } from './store/school-batteries-data.store';

@NgModule({
  declarations: [
    SchoolsComponent,
    BatteryDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    SchoolsComponent,
  ],
  providers: [
    SchoolBatteriesDataStore,
  ],
})
export class SchoolsModule { }
