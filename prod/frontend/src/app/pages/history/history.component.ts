import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DataPoint } from '../../shared/interfaces/data-point';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.less'
})
export class HistoryComponent {
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
