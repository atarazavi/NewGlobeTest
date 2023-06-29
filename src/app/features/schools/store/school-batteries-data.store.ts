import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, pipe } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { SchoolBatteries } from '../models/school-batteries.interface';

interface SchoolBatteriesDataStoreInterface {
  schoolBatteriesData: SchoolBatteries[] | null;
  schoolBatteriesDataError: HttpErrorResponse | null;
}

@Injectable()
export class SchoolBatteriesDataStore extends ComponentStore<SchoolBatteriesDataStoreInterface> {
  readonly schoolBatteriesData$ = this.select((state) => state.schoolBatteriesData);
  readonly schoolBatteriesDataError$ = this.select((state) => state.schoolBatteriesDataError);

  constructor(
    private dataService: DataService,
  ) {
    super({
      schoolBatteriesData: null,
      schoolBatteriesDataError: null,
    });
  }

  loadData$ = this.effect<void>(
    pipe(
      switchMap(() =>
        this.dataService.get(0).pipe(
          tap({
            next: (schoolBatteriesData) => {
              this.patchState({ schoolBatteriesData: schoolBatteriesData });
              this.patchState({ schoolBatteriesDataError: null });
            },
            error: (schoolBatteriesDataError) =>
              this.patchState({ schoolBatteriesDataError: schoolBatteriesDataError }),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
