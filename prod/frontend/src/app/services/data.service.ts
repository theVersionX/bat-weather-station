import { Injectable } from '@angular/core';
import { Antenna } from '../shared/interfaces/antenna';
import { ApiService } from './api.service';
import { AccountService } from './account.service';
import { ANTENNA_IDS } from '../shared/data/antenna-ids';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private antennaSettings!: Antenna; //different antennas.

  constructor(private apiService: ApiService, private accountService: AccountService) {
    this.Init();
  }

  Init(): void {
    //this.loadAntennaSettings();
  }

  loadAntennaSettings(callback:Function): void {
    this.apiService.loadAntennaSettings(this.accountService.authenticationData.username, this.accountService.authenticationData.password, ANTENNA_IDS.parabol).subscribe((antennaSettings: string) => {
      this.antennaSettings = JSON.parse(antennaSettings);
      callback(this.antennaSettings);
    });
  }

  getAntennaSettings(): void {
    return JSON.parse(JSON.stringify(this.antennaSettings));
  }
}
