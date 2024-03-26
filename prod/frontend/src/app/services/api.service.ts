import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private globalVariablesService: GlobalVariablesService) {
  }
  sendMailToReserveTreff(responsibleEMail: string, userEMail: string, reservation: string): Observable<number> {
    return this.httpClient.post<number>(`${this.getServerPath()}/sendMailToReserveTreff.php`, { responsibleEMail: responsibleEMail, userEMail: userEMail, reservation: reservation });
  }
  loadData(dataId:string): Observable<string> {
    return this.httpClient.post<string>(`${this.getServerPath()}/loadData.php`, {dataId:dataId});
  }
  saveData(data:string,dataId:string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.getServerPath()}/saveData.php`, {data:data, dataId:dataId});
  }
  getServerPath(): string {
    return this.globalVariablesService.serverPath;
  }
}
