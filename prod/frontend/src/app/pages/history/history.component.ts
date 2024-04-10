import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DataPoint } from '../../shared/interfaces/data-point';
import {  WEATHER_PARAMETERS_AS_ARRAY } from '../../shared/data/weather-parameters';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { WeatherParameter } from '../../shared/interfaces/weather-parameter';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.less'
})
export class HistoryComponent {
 

  constructor(private dataService:DataService){}

  getWeatherParameters():WeatherParameter[]{
    return WEATHER_PARAMETERS_AS_ARRAY;
  }

  getChartOptions(weatherParam:WeatherParameter):any{
    return {
      title: {
        text:"",
      },
      data: [
        {
          type: 'line',
          dataPoints: this.dataService.getWeatherDataById(weatherParam.arrayName),
        },
      ],
    };
  }

  


  getTemperatureData(): DataPoint[] {
    return [
      { label: 'Apple', y: 10 },
      { label: 'Orange', y: 15 },
      { label: 'Banana', y: 25 },
      { label: 'Mango', y: 30 },
      { label: 'Grape', y: 28 },
    ];
  }

}
