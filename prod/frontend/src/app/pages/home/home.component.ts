import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AttenuationParam } from '../../shared/interfaces/attenuation-param';
import { ATENUATION_PARAMS_AS_ARRAY } from '../../shared/data/attenuation-params';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../shared/interfaces/weather-data';
import { DataPoint } from '../../shared/interfaces/data-point';
import { WEATHER_PARAMETERS } from '../../shared/data/weather-parameters';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit {

  //allWeatherData: WeatherData = EMPTY_OBJECTS.getEmptyWeatherData();

  graphsData: any[][] = [];

  constructor(private dataService: DataService) {
    dataService.weatherDataUpdatedEvent.subscribe((allWeatherData: WeatherData) => {
      //this.allWeatherData = allWeatherData;
      this.calculateGraphs()
    });
    dataService.hardwareSettingsUpdatedEvent.subscribe(() => {
      this.calculateGraphs()
    });
  }

  ngOnInit(): void {
    this.calculateGraphs()
  }

  calculateGraphs(): void {
    let weatherData=this.dataService.getAllWeatherData();
    for (let i = 0; i < this.getAttenuationParameters().length; i++) {
      let dataPoints: DataPoint[] = this.getAttenuationParameters()[i].getData(this.dataService.getAntennaSettings().antennaParams.frequency,weatherData )
      this.graphsData[i] = [
        {
          type: 'line',
          dataPoints: dataPoints,
        }
      ];
      /* //insert more lines into same chart
      if(weatherData.pressures.length==dataPoints.length){
        console.log("inserted");
        this.graphsData[i].push({
          type:'line',
          dataPoints:this.dataService.getWeatherDataById(WEATHER_PARAMETERS.temperature.arrayName)
        })
      }
      */
    }

    console.log(this.graphsData);
  }

  getAttenuationParameters(): AttenuationParam[] {
    return ATENUATION_PARAMS_AS_ARRAY;
  }

  getChartOptions(ind: number): any {
    let data: any[] = this.graphsData[ind];
    return {
      title: {
        text: "",
      },
      data: data,
    };
  }

}
