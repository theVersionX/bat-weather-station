import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faBurger } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less'
})
export class NavbarComponent {

  animatedOnce:boolean=false;
  burgerIcon=faBars;

  constructor(private navigationService: NavigationService, private router: Router) {
    router.events.subscribe(() => {
      navigationService.curPageInd = -1;
      let urlSegments:string[]=router.url.split("/");
      if(urlSegments.length>1){
        for (let i = 0; i < navigationService.pages.length; i++) {
          if (urlSegments[1] == navigationService.pages[i]) {
            navigationService.curPageInd = i;
          }
        }
      }
    });
  }
  
  setCurPageInd(ind: number): void {
    this.navigationService.curPageInd = ind;
  }

  navigateToPage(ind: number): void {
    this.router.navigate([this.getPages()[ind]]);
    this.navigationService.navIsOpen=false;
  }


  toggleNav(): void {
    this.navigationService.navIsOpen = !this.navigationService.navIsOpen;
  }

  getShowSpacer():boolean{
    return this.getCurPageInd()!=0;
  }
  
  getAnimateNav():boolean{
    setTimeout(()=>{
      this.animatedOnce=true;
    },4000);
    if(!this.animatedOnce && (this.getCurrentPageInd()==0)){
      return true
    }else{
      return false;
    }
  }

  getCurrentPageInd(): number {
    return this.navigationService.curPageInd;
  }
  getRoutes(): string[] {
    return this.navigationService.pages;
  }

  getNavIsOpen(): boolean {
    return this.navigationService.navIsOpen;
  }
  getPages(): string[] {
    return this.navigationService.pages;
  }
  getCurPageInd(): number {
    return this.navigationService.curPageInd;
  }
  getPageIcons(): any[] {
    return this.navigationService.pagesIcons;
  }
}
