import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../services/data.service';
import { HARDWARE_IDS } from '../../shared/data/hardware-ids';
import { Antenna } from '../../shared/interfaces/antenna';
import { EMPTY_OBJECTS } from '../../shared/data/empty-objects';

@Component({
  selector: 'app-antenna-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './antenna-settings.component.html',
  styleUrl: './antenna-settings.component.less'
})
export class AntennaSettingsComponent {
  antenna: Antenna =EMPTY_OBJECTS.getEmptyAntenna()

  saveIcon = faSave;

  constructor(private dataService: DataService) {
    this.loadAntennaSettings();
  }

  loadAntennaSettings(): void {
    this.dataService.loadHardwareSettings(HARDWARE_IDS.parabolAntenna, (antenna: Antenna) => {
      this.antenna = antenna;
    });
  }

  save(): void {
    this.dataService.saveHardwareSettings(HARDWARE_IDS.parabolAntenna, JSON.stringify(this.antenna),(worked:boolean)=>{
      console.log(worked);
      this.saveIcon=faCheck;
      setTimeout(()=>{
        this.saveIcon=faSave;
      },3000);
    });
  }
}
