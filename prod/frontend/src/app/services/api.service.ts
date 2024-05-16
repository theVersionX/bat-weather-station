import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';
import { WeatherData } from '../shared/interfaces/weather-data';
import { Observation, ObservationData } from '../shared/interfaces/observation';
import { Antenna } from '../shared/interfaces/antenna';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private globalVariablesService: GlobalVariablesService
  ) { }

  loadAllWeatherData(username:string,password:string): Observable<WeatherData> {
    return this.httpClient.post<WeatherData>(
      `${this.getServerPath()}/loadAllWeatherData.php`,
      {username:username,password:password}
    );
  }
  loadLatestWeatherData(username:string,password:string): Observable<WeatherData[]> {
    return this.httpClient.post<WeatherData[]>(
      `${this.getServerPath()}/loadLatestWeatherData.php`,
      {}
    );
  }
  getWeatherDataFromWeatherUnderground(): Observable<ObservationData> {
    return this.httpClient.post<ObservationData>(
      `${this.getServerPath()}/loadWeatherDataFromWeatherUnderground.php`,
      //'https://api.weather.com/v2/pws/observations/current?stationId=IHORW43&format=json&units=m&apiKey=e6ed9af54b7b4010ad9af54b7b90108f',
      {}
    );
  }

  loadWindWarning(username:string,password:string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.getServerPath()}/loadWindWarning.php`,{username:username,password:password}
    );
  }

  insertWeatherData(weatherData: WeatherData): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.getServerPath()}/insertWeatherData.php`,
      weatherData
    );
  }

  loadHardwareSettings(username:string,password:string,hardwareId:string): Observable<string> {
    return this.httpClient.post<string>(
      `${this.getServerPath()}/loadHardwareSettings.php`,
      {username:username,password:password,hardwareId:hardwareId }
    );
  }
  saveHardwareSettings(username:string,password:string,hardwareId:string, hardwareSettings: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.getServerPath()}/saveHardwareSettings.php`,
      { username:username,password:password,hardwareId:hardwareId, hardware: hardwareSettings }
    );
  }

  getServerPath(): string {
    return this.globalVariablesService.serverPath;
  }
}
