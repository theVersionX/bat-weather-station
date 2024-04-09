import { Component } from '@angular/core';
import { Antenna } from '../../shared/interfaces/antenna';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faSave } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { AccountService } from '../../services/account.service';
import { ANTENNA_IDS } from '../../shared/data/antenna-ids';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less',
})
export class SettingsComponent {
  antennaSettings: Antenna = {
    name: '',
    coord: { lat: 0, long: 0 },
    antennaParams: {
      metersAboveGround: 0,
      diameter: 0,
      elevation: 0,
      frequency: 0,
      efficiency: 0,
    },
  };

  saveIcon = faSave;

  constructor(private apiService: ApiService, private dataService: DataService, private accountService: AccountService) {
    this.loadAntennaSettings();
  }

  loadAntennaSettings(): void {
    this.dataService.loadAntennaSettings((antennaSettings: Antenna) => {
      this.antennaSettings = antennaSettings;
    });
  }

  save(): void {
    this.apiService.saveAntennaSettings(this.accountService.authenticationData.username, this.accountService.authenticationData.password, ANTENNA_IDS.parabol, this.antennaSettings).subscribe((worked: boolean) => {
      console.log(worked);
      this.saveIcon=faCheck;
      setTimeout(()=>{
        this.saveIcon=faSave;
      },3000);
    });
  }

}
