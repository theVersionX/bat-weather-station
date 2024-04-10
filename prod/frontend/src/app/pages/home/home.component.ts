import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DataPoint } from '../../shared/interfaces/data-point';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  chartOptions = {
    title: {
      text: 'Temperatur',
    },
    data: [
      {
        type: 'line',
        dataPoints: this.getTemperatureData(),
      },
    ],
  };

  constructor(private apiService: ApiService) {
    /*
    apiService.insertWeatherData("hello from frontend").subscribe((worked:boolean) => {
      console.log(worked);
    });
    */
   /*
    apiService
      .getWeatherDataFromWeatherUnderground()
      .subscribe((res: ObservationData) => {
        if (res.observations.length > 0) {
          //console.log(res.observations[0]);
          let observation: Observation = res.observations[0];
          let weatherData: WeatherData = {
            id: 0,
            timestamp: '',
            pressure: observation.metric.pressure,
            temperature: observation.metric.temp,
            windSpeed: observation.metric.windSpeed,
            humidity: observation.humidity,
            precipitation: observation.metric.precipTotal,
          };
          console.log(weatherData);
          apiService
            .insertWeatherData(weatherData)
            .subscribe((worked: boolean) => {
              console.log(worked);
            });
        }
      });
      */
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
