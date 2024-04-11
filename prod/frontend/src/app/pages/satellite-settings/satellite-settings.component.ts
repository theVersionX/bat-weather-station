import { Component } from '@angular/core';
import { Satellite } from '../../shared/interfaces/satellite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../services/account.service';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { HARDWARE_IDS } from '../../shared/data/antenna-ids';

@Component({
  selector: 'app-satellite-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],

  templateUrl: './satellite-settings.component.html',
  styleUrl: './satellite-settings.component.less'
})
export class SatelliteSettingsComponent {
  satelliteSettings: Satellite = {
    name: '',
    pahtHeight:0,
  };

  saveIcon = faSave;

  constructor(private apiService: ApiService, private dataService: DataService, private accountService: AccountService) {
    this.loadAntennaSettings();
  }

  loadAntennaSettings(): void {
    this.dataService.loadHardwareSettings(HARDWARE_IDS.satellite, (satelliteSettings: Satellite) => {
      this.satelliteSettings = satelliteSettings;
    });
  }

  save(): void {
    this.dataService.saveHardwareSettings(HARDWARE_IDS.satellite, JSON.stringify(this.satelliteSettings),(worked:boolean)=>{
      console.log(worked);
      this.saveIcon=faCheck;
      setTimeout(()=>{
        this.saveIcon=faSave;
      },3000);
    });
  }
}
