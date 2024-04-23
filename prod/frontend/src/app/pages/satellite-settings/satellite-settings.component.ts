import { Component } from '@angular/core';
import { Satellite } from '../../shared/interfaces/satellite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../services/data.service';
import { HARDWARE_IDS } from '../../shared/data/hardware-ids';
import { EMPTY_OBJECTS } from '../../shared/data/empty-objects';

@Component({
  selector: 'app-satellite-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],

  templateUrl: './satellite-settings.component.html',
  styleUrl: './satellite-settings.component.less'
})
export class SatelliteSettingsComponent {
  satellite: Satellite= EMPTY_OBJECTS.getEmptySatellite();

  saveIcon = faSave;

  constructor( private dataService: DataService) {
    this.loadAntennaSettings();
    //this.save();
  }

  loadAntennaSettings(): void {
    this.dataService.loadHardwareSettings(HARDWARE_IDS.satellite, (satellite: Satellite) => {
      this.satellite = satellite;
    });
  }

  save(): void {
    this.dataService.saveHardwareSettings(HARDWARE_IDS.satellite, JSON.stringify(this.satellite),(worked:boolean)=>{
      console.log(worked);
      this.saveIcon=faCheck;
      setTimeout(()=>{
        this.saveIcon=faSave;
      },3000);
    });
  }
}
