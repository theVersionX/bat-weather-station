import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  websiteName: string = "Weather Station";
  legalityLink: string = "https://www.legality.versionx.ch/#/";
  serverPath: string = "https://weather.versionx.ch/api";
  
  isSafari: boolean = true;

  constructor() {
    this.isSafari = this.getBrowserName() == 'safari';//todo uncomment
  }

  getMobileExtionsion(): string {
    return window.innerWidth > 800 ? "" : "-mobile";
  }

  getBrowserName(): string {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  getSubclass(ind: number): string {
    let subclasses: string[] = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    if (ind < subclasses.length) {
      return subclasses[ind];
    }
    else {
      return subclasses[subclasses.length - 1];
    }
  }
}
