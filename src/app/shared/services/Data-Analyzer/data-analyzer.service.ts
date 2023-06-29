import { Injectable } from '@angular/core';
import { School } from 'src/app/features/schools/models/school.interface';

@Injectable({
  providedIn: 'root'
})
export class DataAnalyzerService {

  calculateBatteryConsumption(data: any[]): School[] {
    // Group the data by academyId and serialNumber
    const groups = data.reduce((groups, item) => {
      const group = `${item.academyId}---${item.serialNumber}`;
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});

    // Transform the groups object to an array of School objects
    const schools: { [id: number]: School } = {};

    Object.entries(groups as { [key: string]: any[] }).forEach(([group, items]) => {
      // Sort items by timestamp
      items.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      let totalUsage = 0;
      let count = 0;

      for (let i = 1; i < items.length; i++) {
        const prev = items[i - 1];
        const curr = items[i];

        // If the battery was charged between readings, continue to the next reading
        if (curr.batteryLevel > prev.batteryLevel) continue;

        const diffHours = Math.abs(new Date(curr.timestamp).getTime() - new Date(prev.timestamp).getTime()) / (1000 * 60 * 60);
        const diffBattery = prev.batteryLevel - curr.batteryLevel;

        totalUsage += diffBattery / diffHours * 24;
        count++;
      }

      if (count >= 1 && totalUsage / count > 0.3) {
        const [academyId, serialNumber] = group.split('---');
        const academyIdNumber = Number(academyId);

        if (!schools[academyIdNumber]) {
          schools[academyIdNumber] = {
            academyId: academyIdNumber,
            unhealthyDevices: [],
          };
        }

        schools[academyIdNumber].unhealthyDevices.push(serialNumber);
      }
    });

    // Convert the schools object to an array
    const schoolArray = Object.values(schools);

    // Sort the array in descending order based on the count of unhealthy devices
    schoolArray.sort((a, b) => b.unhealthyDevices.length - a.unhealthyDevices.length);

    return schoolArray;
  }

}
