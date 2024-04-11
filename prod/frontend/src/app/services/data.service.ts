import { Injectable } from '@angular/core';
import { Antenna } from '../shared/interfaces/antenna';
import { ApiService } from './api.service';
import { AccountService } from './account.service';
import { DataPoint } from '../shared/interfaces/data-point';
import { WeatherData } from '../shared/interfaces/weather-data';
import { HARDWARE_IDS } from '../shared/data/antenna-ids';
import { Satellite } from '../shared/interfaces/satellite';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private antennaSettings!: Antenna;
  private satelliteSettings!: Satellite
  private allWeatherData!: WeatherData;

  constructor(private apiService: ApiService, private accountService: AccountService) {
    this.Init();
  }

  Init(): void {
    //this.loadAntennaSettings();
    this.loadAllWeatherData(() => { });
  }
  //load----------------------------------------------------------------------
  loadHardwareSettings(hardwareId: string, callback: Function): void {
    this.apiService.loadHardwareSettings(this.accountService.authenticationData.username, this.accountService.authenticationData.password, hardwareId).subscribe((hardwareSettings: string) => {
    console.log(hardwareSettings);
      if(hardwareSettings.length!=0 && hardwareSettings!="-1"){
      switch (hardwareId) {
        case HARDWARE_IDS.parabolAntenna:
          this.antennaSettings = JSON.parse(hardwareSettings);
          callback(this.antennaSettings);
          break;
        case HARDWARE_IDS.satellite:
          this.satelliteSettings = JSON.parse(hardwareSettings);
          callback(this.satelliteSettings);
      }
     }
    });
  }

  loadAllWeatherData(callback: Function): void {
    this.apiService.loadAllWeatherData(this.accountService.authenticationData.username, this.accountService.authenticationData.password).subscribe((weatherData: WeatherData) => {
      this.allWeatherData = weatherData;
      callback(this.allWeatherData);
      console.log(this.allWeatherData);
    });
  }


  //save-------------------------------------------------------------------------
  saveHardwareSettings(hardwareId: string, hardwareSettings: string, callback: Function): void {
    this.apiService.saveHardwareSettings(this.accountService.authenticationData.username, this.accountService.authenticationData.password, hardwareId, hardwareSettings).subscribe((worked: boolean) => {
      callback(worked);
    });
  }

  getAntennaSettings(): void {
    return JSON.parse(JSON.stringify(this.antennaSettings));
  }
  getSatelliteSettings(): void {
    return JSON.parse(JSON.stringify(this.satelliteSettings));
  }

  getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
  }

  getWeatherDataById(weatherParamId: string): DataPoint[] {
    const dataPoints: DataPoint[] = [];
    if (this.allWeatherData?.timestamps != undefined) {
      const field = weatherParamId as keyof WeatherData;

      let arr: any = this.allWeatherData[field];

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
