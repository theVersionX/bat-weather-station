import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DataPoint } from '../../shared/interfaces/data-point';
import { AttenuationParam } from '../../shared/interfaces/attenuation-param';
import { ATENUATION_PARAMS_AS_ARRAY } from '../../shared/data/attenuation-params';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule],
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

  constructor(private dataService:DataService) {
   
  }

  getAttenuationParameters():AttenuationParam[]{
    return ATENUATION_PARAMS_AS_ARRAY;
  }

  getChartOptions(attenuationParam:AttenuationParam):any{
    return {
      title: {
        text: "",
      },
      data: [
        {
          type: 'line',
          dataPoints: attenuationParam.getData(),
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
