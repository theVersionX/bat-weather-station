import { Routes } from '@angular/router';
import { PAGES } from './shared/data/page-consts';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { SatelliteSettingsComponent } from './pages/satellite-settings/satellite-settings.component';
import { AntennaSettingsComponent } from './pages/antenna-settings/antenna-settings.component';

export const routes: Routes = [
    { path: '', redirectTo: PAGES.home, pathMatch: 'full' },

    { path: PAGES.home, component: HomeComponent },
    { path: PAGES.history, component: HistoryComponent },
    { path: PAGES.antennaSettings, component: AntennaSettingsComponent },
    { path: PAGES.satellite, component: SatelliteSettingsComponent },
    { path: '**', component: HomeComponent }


];
