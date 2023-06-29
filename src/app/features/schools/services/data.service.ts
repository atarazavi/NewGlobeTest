import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiEndpoints } from 'src/app/shared/config/api-endpoints';
import { appConfigurations } from 'src/app/shared/config/app-config';
import { SchoolBatteries } from './../models/school-batteries.interface';
import { GenericBackendService } from 'src/app/shared/services/backend/generic-backend.service';

@Injectable({
  providedIn: 'root'
})
export class DataService extends GenericBackendService<SchoolBatteries, void> {
  constructor(
    httpClient: HttpClient,
  ) {
    super(appConfigurations.baseUrl + ApiEndpoints.SchoolBatteriesData, httpClient);
  }
}
