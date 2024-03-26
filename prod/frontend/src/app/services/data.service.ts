import { Injectable } from '@angular/core';
import { Antenna } from '../shared/interfaces/antenna';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  antennas:Antenna[]=[]; //different antennas.

  constructor() { }
}
