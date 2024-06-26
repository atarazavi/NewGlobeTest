import { DataAnalyzerService } from './../../shared/services/Data-Analyzer/data-analyzer.service';
import { Component, ViewChild } from '@angular/core';
import { SchoolBatteries } from './models/school-batteries.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { SchoolBatteriesDataStore } from './store/school-batteries-data.store';
import { HttpErrorResponse } from '@angular/common/http';
import { isNotNull } from 'src/app/shared/typescript/nullCheck';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { School } from './models/school.interface';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SchoolsComponent {
  schoolBatteriesData$: Observable<SchoolBatteries[] | null>;
  schoolBatteriesDataError$: Observable<HttpErrorResponse | null>;
  columnsToDisplay: string[];
  columnsToDisplayWithExpand: string[];
  dataSource: MatTableDataSource<School>;
  expandedElement: SchoolBatteries | null;
  private readonly destroyed$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<School>;

  constructor(
    public schoolBatteriesDataStore: SchoolBatteriesDataStore,
    private dataAnalyzerService: DataAnalyzerService,
  ) {
    this.schoolBatteriesData$ = schoolBatteriesDataStore.schoolBatteriesData$;
    this.schoolBatteriesDataError$ = schoolBatteriesDataStore.schoolBatteriesDataError$;
    this.columnsToDisplay = ['Academy ID', 'Number Of Corrupted Batteries'];
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.schoolBatteriesDataStore.loadData$();
    this.schoolBatteriesData$
      .pipe(
        filter(isNotNull),
        takeUntil(this.destroyed$),
      )
      .subscribe(response => {
        const analyzedSchools: School[] = this.dataAnalyzerService.calculateBatteryConsumption(response);
        this.dataSource = new MatTableDataSource(analyzedSchools);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  applyFilter(event: KeyboardEvent) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    this.dataSource.filter = event.target.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
