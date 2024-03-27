import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  constructor(private apiService: ApiService) {
    apiService.insertWeatherData("hello from frontend").subscribe((worked:boolean) => {
      console.log(worked);
    });
  }
}
