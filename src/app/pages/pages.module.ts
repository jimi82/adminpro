import { NgModule } from '@angular/core';

// Modules

import { FormsModule } from '@angular/forms';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PAGES_ROUTES } from './pages.routes';

// temporal
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { GraphicDonaComponent } from '../components/graphic/graphic-dona.component';

@NgModule({
  declarations: [
    // Pages
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncreaserComponent,
    GraphicDonaComponent

  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ]
})
export class PagesModule { }
