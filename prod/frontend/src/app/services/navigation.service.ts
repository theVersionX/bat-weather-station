import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { faInstagram, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faGem, faHandshake, faHeart, faHome, faImage, faLink, faPeopleLine, faPhone, faPortrait, faSatellite, faTimeline, faTowerBroadcast, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { PAGES } from '../shared/data/page-consts';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  pages: string[] = [PAGES.home,PAGES.history, PAGES.antennaSettings,PAGES.satellite];
  pagesIcons: any[] = [
    faChartLine,
    faTimeline,
    faTowerBroadcast,
    faSatellite
  ];
  curPageInd: number = 0;

  navIsOpen: boolean = false;

  constructor(private router: Router) { }

}
