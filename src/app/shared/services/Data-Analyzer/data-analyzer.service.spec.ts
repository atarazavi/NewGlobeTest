import { TestBed } from '@angular/core/testing';

import { DataAnalyzerService } from './data-analyzer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataAnalyzerService', () => {
  let service: DataAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(DataAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return "unknown" for a single data point', () => {
    const data = [
      {
        academyId: 1,
        serialNumber: 'ABC123',
        timestamp: '2023-06-28T12:00:00',
        batteryLevel: 100,
      },
    ];

    const result = service.calculateBatteryConsumption(data);
    expect(result).toEqual([]);
  });

  it('should calculate average daily battery usage for a device with two data points', () => {
    const data = [
      {
        academyId: 1,
        serialNumber: 'ABC123',
        timestamp: '2023-06-28T12:00:00',
        batteryLevel: 100,
      },
      {
        academyId: 1,
        serialNumber: 'ABC123',
        timestamp: '2023-06-28T18:00:00',
        batteryLevel: 80,
      },
    ];

    const result = service.calculateBatteryConsumption(data);
    const expected = [
      {
        academyId: 1,
        unhealthyDevices: ['ABC123'],
      },
    ];

    expect(result).toEqual(expected);
  });
  it('should exclude the charging event and calculate average daily battery usage', () => {
    const data = [
      {
        academyId: 1,
        serialNumber: 'ABC123',
        timestamp: '2023-06-28T12:00:00',
        batteryLevel: 100,
      },
      {
        academyId: 1,
        serialNumber: 'ABC123',
        timestamp: '2023-06-28T18:00:00',
        batteryLevel: 80,
      },
      {
        academyId: 1,
        serialNumber: 'ABC123',
        timestamp: '2023-06-29T12:00:00',
        batteryLevel: 100,
      },
    ];

    const result = service.calculateBatteryConsumption(data);
    const expected = [
      {
        academyId: 1,
        unhealthyDevices: ['ABC123'],
      },
    ];

    expect(result).toEqual(expected);
  });
  it('should identify the schools with the highest number of battery issues', () => {
    const data = [
      // Academy 1 with two unhealthy devices
      { academyId: 1, serialNumber: 'ABC123', timestamp: '2023-06-28T12:00:00', batteryLevel: 100 },
      { academyId: 1, serialNumber: 'ABC123', timestamp: '2023-06-28T18:00:00', batteryLevel: 80 },
      { academyId: 1, serialNumber: 'DEF456', timestamp: '2023-06-28T12:00:00', batteryLevel: 100 },
      { academyId: 1, serialNumber: 'DEF456', timestamp: '2023-06-28T18:00:00', batteryLevel: 80 },
      // Academy 2 with one unhealthy device
      { academyId: 2, serialNumber: 'XYZ789', timestamp: '2023-06-28T12:00:00', batteryLevel: 100 },
      { academyId: 2, serialNumber: 'XYZ789', timestamp: '2023-06-28T18:00:00', batteryLevel: 80 },
    ];

    const result = service.calculateBatteryConsumption(data);
    const expected = [
      {
        academyId: 1,
        unhealthyDevices: ['ABC123', 'DEF456'],
      },
      {
        academyId: 2,
        unhealthyDevices: ['XYZ789'],
      },
    ];

    expect(result).toEqual(expected);
  });
});