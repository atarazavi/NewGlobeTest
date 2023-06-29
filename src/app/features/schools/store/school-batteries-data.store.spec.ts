import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { of as observableOf } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SchoolBatteriesDataStore } from './school-batteries-data.store';
import { DataService } from '../services/data.service';
import { SchoolBatteries } from '../models/school-batteries.interface';

describe('schoolBatteriesData Store API Call', () => {
  let backendService: Spy<DataService>;
  let testStore: SchoolBatteriesDataStore;
  const sampleSchoolBatteriesDataResponse: SchoolBatteries[] = [{
    "academyId": 30006,
    "batteryLevel": 0.68,
    "employeeId": "T1007384",
    "serialNumber": "1805C67HD02259",
    "timestamp": "2019-05-17T07:47:25.833+01:00"
  }];
  beforeEach(() => {
    backendService = createSpyFromClass(DataService, ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SchoolBatteriesDataStore,
        { provide: DataService, useValue: backendService },
      ],
    });
    testStore = TestBed.inject(SchoolBatteriesDataStore);
  });

  it('should update schoolBatteriesData$ by backend successful response value when service calling is successful with 200 status & set the schoolBatteriesDataError$ to null', () => {
    backendService.get.and.returnValue(observableOf(sampleSchoolBatteriesDataResponse));
    testStore.loadData$();

    const observerSpyData = subscribeSpyTo(testStore.schoolBatteriesData$);
    const observerSpyDataError = subscribeSpyTo(testStore.schoolBatteriesDataError$);

    expect(observerSpyData.getLastValue()?.length).toBe(1);
    expect(observerSpyDataError.getLastValue()).toBeNull();
  });

  it('should update the schoolBatteriesDataError$ with HttpError', () => {
    backendService.get.and.throwWith(observableOf(ErrorEvent));
    testStore.loadData$();

    const observerSpyDataError = subscribeSpyTo(testStore.schoolBatteriesDataError$);

    expect(observerSpyDataError.getLastValue()).not.toBeNull();
  });
});
