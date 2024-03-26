import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { faInstagram, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faGem, faHandshake, faHeart, faHome, faImage, faLink, faPeopleLine, faPhone, faPortrait, faTowerBroadcast, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { PAGES } from '../shared/data/page-consts';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  pages: string[] = [PAGES.home, PAGES.settings];
  pagesIcons: any[] = [
    faChartLine,
    faTowerBroadcast,
  ];
  curPageInd: number = 0;

  socialLinks: string[] = [
    "https://www.instagram.com/theVersionX/",
    "https://t.me/theVersionX",
    "https://www.youtube.com/@versionx8901",
  ];

  socialIcons: any = [
    faInstagram,
    faTelegram,
    faYoutube,
  ];

  pfarrblattLink: string = "https://www.horizonte-aargau.ch/gottesdienste-und-veranstaltungen/?instid=1406"

  navIsOpen: boolean = false;

  constructor(private router: Router) { }

  goToPfarrblatt(): void {
    window.open(this.pfarrblattLink, "_blank");
  }
}
