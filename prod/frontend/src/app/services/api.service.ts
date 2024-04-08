import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';
import { WeatherData } from '../shared/interfaces/weather-data';
import { Observation, ObservationData } from '../shared/interfaces/observation';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private globalVariablesService: GlobalVariablesService
  ) {}

  loadAllWeatherData(): Observable<WeatherData> {
    return this.httpClient.post<WeatherData>(
      `${this.getServerPath()}/loadAllWeatherData.php`,
      {}
    );
  }
  loadLatestWeatherData(): Observable<WeatherData[]> {
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

  loadWindWarning(): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.getServerPath()}/loadWindWarning.php`,
      {}
    );
  }

  insertWeatherData(weatherData: WeatherData): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.getServerPath()}/insertWeatherData.php`,
      weatherData
    );
  }

  getServerPath(): string {
    return this.globalVariablesService.serverPath;
  }
}
