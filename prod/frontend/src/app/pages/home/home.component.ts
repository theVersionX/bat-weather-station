import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AttenuationParam } from '../../shared/interfaces/attenuation-param';
import { ATENUATION_PARAMS_AS_ARRAY } from '../../shared/data/attenuation-params';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../shared/interfaces/weather-data';
import { DataPoint } from '../../shared/interfaces/data-point';
import { AntennaParams } from '../../shared/interfaces/antenna-params';
import { GaseousAttenuation } from '../../shared/classes/calculations/gaseous-attenuation';
import { PrecipitationAttenuation } from '../../shared/classes/calculations/precipitation-attenuation';
import { CloudAttenuation } from '../../shared/classes/calculations/cloud-attenuation';
import { CLOUD_NAMES_AS_ARRAY, CLOUD_TYPES, CLOUD_TYPES_AS_ARRAY } from '../../shared/data/cloud-types';
import { CloudType } from '../../shared/interfaces/cloud-type';
import { CustomRadioBtnsComponent } from '../../shared/shared-components/custom-radio-btns/custom-radio-btns.component';
import { ScintillationAttenuation } from '../../shared/classes/calculations/scintillation-attenuation';
import { CustomSliderComponent } from '../../shared/shared-components/custom-slider/custom-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, CustomRadioBtnsComponent, CustomSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit {

  //allWeatherData: WeatherData = EMPTY_OBJECTS.getEmptyWeatherData();

  graphsData: any[][] = [];
  isCritical: boolean = false;

  cloudType: CloudType = JSON.parse(JSON.stringify(CLOUD_TYPES.cirrus)); //for cloud attenuation
  pPercentageOfTime: number = 1; //for scintillation attenuation

  totalAttenuation: any = {type:'line',dataPoints:[]};

  showLargeGraphs: boolean = false;

  heightOfTroposphäre:number=10; 

  constructor(private dataService: DataService) {
    dataService.weatherDataUpdatedEvent.subscribe((allWeatherData: WeatherData) => {
      //this.allWeatherData = allWeatherData;
      this.calculateGraphs()
    });
    dataService.windWarningUpdatedEvent.subscribe((isCritical: boolean) => {
      this.isCritical = isCritical;
      console.log(isCritical)
    });
    dataService.hardwareSettingsUpdatedEvent.subscribe(() => {
      this.calculateGraphs()
    });
  }

  ngOnInit(): void {
    this.calculateGraphs()
  }

  calculateGraphs(): void {
    let weatherData = this.dataService.getAllWeatherData();
    this.totalAttenuation = [];
    for (let i = 0; i < this.getAttenuationParameters().length; i++) {
      let dataPoints: DataPoint[] = [];
      switch (i) {
        case 0:
          dataPoints = new GaseousAttenuation().calculateAttenuation(this.getAntennaParams().frequency, weatherData, this.dataService.getAntennaSettings())
          this.graphsData[i] = [{ type: 'line', dataPoints: dataPoints }];
          if (dataPoints.length > 0) {
            this.totalAttenuation={type:'line',dataPoints:JSON.parse(JSON.stringify(dataPoints))}
            for(let i2=0;i2<dataPoints.length;i2++){
              this.totalAttenuation.dataPoints[i2].y =dataPoints[i2].y*this.heightOfTroposphäre;
            }
          }
         
          break;
        case 1:
          dataPoints = new PrecipitationAttenuation().calculateAttenuation(weatherData,
            this.dataService.getAntennaSettings(),
            this.dataService.getSatelliteSettings(),
            (attenuationAtCurrentFrequency: number) => {
              if (!isNaN(attenuationAtCurrentFrequency)) {
                for(let i2=0;i2<this.totalAttenuation.dataPoints.length;i2++){
                  this.totalAttenuation.dataPoints[i2].y += attenuationAtCurrentFrequency*this.heightOfTroposphäre;
                }
              }
            })
          this.graphsData[i] = [{ type: 'line', dataPoints: dataPoints }];
          break;
        case 2:
          dataPoints = new CloudAttenuation().calculateAttenuation(weatherData, this.dataService.getAntennaSettings(), this.cloudType)
          this.graphsData[i] = [{ type: 'line', dataPoints: dataPoints }];
          if (dataPoints.length > 0) {

            for (let i2 = 0; i2 < dataPoints.length; i2++) {
              this.totalAttenuation.dataPoints[i2].y += dataPoints[i2].y*this.heightOfTroposphäre;
            }
          }
          break;
        case 3:
          dataPoints = new ScintillationAttenuation().calculateAttenuation(weatherData, this.dataService.getAntennaSettings(), this.pPercentageOfTime)
          this.graphsData[i] = [{ type: 'line', dataPoints: dataPoints }];
          if (dataPoints.length > 0) {
            for (let i2 = 0; i2 < dataPoints.length; i2++) {
              this.totalAttenuation.dataPoints[i2].y += dataPoints[i2].y
            }
          } break;
      }
    }    
  }

  cloudNameSelected(cloudName: string): void {
    for (let i = 0; i < CLOUD_TYPES_AS_ARRAY.length; i++) {
      if (cloudName == CLOUD_TYPES_AS_ARRAY[i].name) {
        this.cloudType = JSON.parse(JSON.stringify(CLOUD_TYPES_AS_ARRAY[i]));
        break;
      }
    }
    this.calculateGraphs()
  }

  pPercentageUpdated(value: number): void {
    this.pPercentageOfTime = value;
    this.calculateGraphs()
  }

  getAttenuationParameters(): AttenuationParam[] {
    return ATENUATION_PARAMS_AS_ARRAY;
  }

  getAntennaParams(): AntennaParams {
    return this.dataService.getAntennaSettings().antennaParams;
  }

  getChartOptions(ind: number, lableAxisX: string, labelAxisY: string): any {
    let data:any=[];
    if(ind!=-1){
       data = this.graphsData[ind];
    }else{
      data=[this.totalAttenuation];
    }

    const chartOptions: any = {
      title: {
        text: "",
      },
      axisX: {
        title: lableAxisX
      },
      axisY: {
        title: labelAxisY
      },
      data: data,
    };
    return chartOptions
  }

  getCloudNames(): string[] {
    return CLOUD_NAMES_AS_ARRAY
  }

}
