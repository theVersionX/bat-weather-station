import { Injectable } from '@angular/core';
import { Antenna } from '../shared/interfaces/antenna';
import { ApiService } from './api.service';
import { AccountService } from './account.service';
import { ANTENNA_IDS } from '../shared/data/antenna-ids';
import { DataPoint } from '../shared/interfaces/data-point';
import { WeatherData } from '../shared/interfaces/weather-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private antennaSettings!: Antenna; //different antennas.
  private allWeatherData!: WeatherData;

  constructor(private apiService: ApiService, private accountService: AccountService) {
    this.Init();
  }

  Init(): void {
    //this.loadAntennaSettings();
    this.loadAllWeatherData(() => { });
  }

  loadAntennaSettings(callback: Function): void {
    this.apiService.loadAntennaSettings(this.accountService.authenticationData.username, this.accountService.authenticationData.password, ANTENNA_IDS.parabol).subscribe((antennaSettings: string) => {
      this.antennaSettings = JSON.parse(antennaSettings);
      callback(this.antennaSettings);
    });
  }

  loadAllWeatherData(callback: Function): void {
    this.apiService.loadAllWeatherData(this.accountService.authenticationData.username, this.accountService.authenticationData.password).subscribe((weatherData: WeatherData) => {
      this.allWeatherData = weatherData;
      callback(this.allWeatherData);
      console.log(this.allWeatherData);
    });
  }

  getAntennaSettings(): void {
    return JSON.parse(JSON.stringify(this.antennaSettings));
  }
  getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
  }

  getWeatherDataById(weatherParamId: string): DataPoint[] {
    const dataPoints: DataPoint[] = [];
    if (this.allWeatherData?.timestamps != undefined) {
      const field = weatherParamId as keyof WeatherData;

      let arr:any=this.allWeatherData[field];
 
      for (let i = 0; i < this.allWeatherData.timestamps.length; i++) {
        const dataPoint: DataPoint = {
          label: this.allWeatherData.timestamps[i],
          y: arr[i]// this.allWeatherData[field][i]
        };
        dataPoints.push(dataPoint);
      }


    }
    return dataPoints;

  }

}
