import { Component } from '@angular/core';
import { GlobalVariablesService } from '../../../services/global-variables.service';
import { NavigationService } from '../../../services/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  sectionTitles: string[] = [
    "Datenschutz",
    "Impressum",
    // "AGBs",
  ];

  constructor(private globalVariablesService: GlobalVariablesService, private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  navigateToPage(ind: number): void {
    window.open(this.globalVariablesService.legalityLink + ind, "_blank");
  }


  getWebsiteName(): string {
    return this.globalVariablesService.websiteName;
  }

}
