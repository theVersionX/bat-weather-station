import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';
import { WeatherData } from '../shared/interfaces/weather-data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private globalVariablesService: GlobalVariablesService) {
  }

  loadAllWeatherData(): Observable<WeatherData> {
    return this.httpClient.post<WeatherData>(`${this.getServerPath()}/loadAllWeatherData.php`, {});
  }
  loadLatestWeatherData(): Observable<WeatherData[]> {
    return this.httpClient.post<WeatherData[]>(`${this.getServerPath()}/loadLatestWeatherData.php`, {});
  }
  loadWindWarning(): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.getServerPath()}/loadWindWarning.php`, {});
  }

  insertWeatherData(msg:string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.getServerPath()}/insertWeatherData.php`, {msg:msg});
  }

    getServerPath(): string {
    return this.globalVariablesService.serverPath;
  }
}
