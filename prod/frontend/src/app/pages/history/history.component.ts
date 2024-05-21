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

  getChartOptions(weatherParam:WeatherParameter, labelAxisX:string,labelAxisY:string):any{
    return {
      title: {
        text:"",
      },
      axisX: {
        title: labelAxisX
      },
      axisY: {
        title: labelAxisY
      },
      data: [
        {
          type: 'line',
          dataPoints: this.dataService.getWeatherDataById(weatherParam.arrayName),
        },
      ],
    };
  }

}
