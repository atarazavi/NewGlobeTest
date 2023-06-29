import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsComponent } from './schools.component';
import { BatteryDetailsComponent } from './components/battery-details/battery-details.component';

@NgModule({
  declarations: [
    SchoolsComponent,
    BatteryDetailsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SchoolsComponent,
  ],
})
export class SchoolsModule { }
