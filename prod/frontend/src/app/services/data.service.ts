import { Injectable } from '@angular/core';
import { Antenna } from '../shared/interfaces/antenna';
import { ApiService } from './api.service';
import { AccountService } from './account.service';
import { DataPoint } from '../shared/interfaces/data-point';
import { WeatherData } from '../shared/interfaces/weather-data';
import { HARDWARE_IDS, HARDWARE_IDS_AS_ARRAY } from '../shared/data/hardware-ids';
import { Satellite } from '../shared/interfaces/satellite';
import { CustomEvent } from '../shared/classes/custom-event';
import { EMPTY_OBJECTS } from '../shared/data/empty-objects';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private antennaSettings: Antenna = EMPTY_OBJECTS.getEmptyAntennaSettings();
  private satelliteSettings: Satellite = EMPTY_OBJECTS.getEmptySatelliteSettings()
  private allWeatherData: WeatherData = EMPTY_OBJECTS.getEmptyWeatherData();

  weatherDataUpdatedEvent: CustomEvent<WeatherData> = new CustomEvent<WeatherData>();
  hardwareSettingsUpdatedEvent: CustomEvent<void> = new CustomEvent<void>();

  constructor(private apiService: ApiService, private accountService: AccountService) {
    this.Init();
  }

  Init(): void {
    //this.loadAntennaSettings();
    for (let hardwareId of HARDWARE_IDS_AS_ARRAY) {
      this.loadHardwareSettings(hardwareId, () => { });
    }
    this.loadAllWeatherData();

  }
  //load----------------------------------------------------------------------
  loadHardwareSettings(hardwareId: string, callback: Function): void {
    this.apiService.loadHardwareSettings(this.accountService.authenticationData.username, this.accountService.authenticationData.password, hardwareId).subscribe((hardwareSettings: string) => {
      console.log(hardwareSettings);
      if (hardwareSettings.length != 0 && hardwareSettings != "-1") {
        switch (hardwareId) {
          case HARDWARE_IDS.parabolAntenna:
            this.antennaSettings = JSON.parse(hardwareSettings);
            callback(this.antennaSettings);
            break;
          case HARDWARE_IDS.satellite:
            this.satelliteSettings = JSON.parse(hardwareSettings);
            callback(this.satelliteSettings);
        }
        this.hardwareSettingsUpdatedEvent.emit();
      }
    });
  }

  loadAllWeatherData(): void {
    this.apiService.loadAllWeatherData(this.accountService.authenticationData.username, this.accountService.authenticationData.password).subscribe((weatherData: WeatherData) => {
      this.allWeatherData = weatherData;
      console.log(this.allWeatherData);
      this.weatherDataUpdatedEvent.emit(this.getAllWeatherData())
    });
  }


  //save-------------------------------------------------------------------------
  saveHardwareSettings(hardwareId: string, hardwareSettings: string, callback: Function): void {
    this.apiService.saveHardwareSettings(this.accountService.authenticationData.username, this.accountService.authenticationData.password, hardwareId, hardwareSettings).subscribe((worked: boolean) => {
      callback(worked);
    });
  }

  getAntennaSettings(): Antenna {
    return JSON.parse(JSON.stringify(this.antennaSettings));
  }
  getSatelliteSettings(): Satellite {
    return JSON.parse(JSON.stringify(this.satelliteSettings));
  }

  getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
  }
  getAllWeatherData(): WeatherData {
    return JSON.parse(JSON.stringify(this.allWeatherData));
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
