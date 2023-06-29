import { Component } from '@angular/core';
import { SchoolBatteries } from './models/school-batteries.interface';
import { Observable } from 'rxjs';
import { SchoolBatteriesDataStore } from './store/school-batteries-data.store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent {
  schoolBatteriesData$: Observable<SchoolBatteries[] | null>;
  schoolBatteriesDataError$: Observable<HttpErrorResponse | null>;
  constructor(
    public schoolBatteriesDataStore: SchoolBatteriesDataStore,
  ) {
    this.schoolBatteriesData$ = schoolBatteriesDataStore.schoolBatteriesData$;
    this.schoolBatteriesDataError$ = schoolBatteriesDataStore.schoolBatteriesDataError$;
  }

}
