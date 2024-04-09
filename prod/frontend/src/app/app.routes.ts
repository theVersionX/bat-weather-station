import { Routes } from '@angular/router';
import { PAGES } from './shared/data/page-consts';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
    { path: '', redirectTo: PAGES.home, pathMatch: 'full' },

    { path: PAGES.home, component: HomeComponent },
    {path:PAGES.history,component:HistoryComponent},
    { path: PAGES.settings, component: SettingsComponent },
    
    { path: '**', component: HomeComponent }


];
