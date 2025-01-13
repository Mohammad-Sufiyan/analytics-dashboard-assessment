import { NgModule } from '@angular/core';
import { CommonModule, NgIfContext } from '@angular/common';
import { AdminRoutingModule } from './ev-routing.module';
import { evLoginComponent } from './ev-login/ev-login.component';
import { evHeaderComponent } from './ev-header/ev-header.component';
import {evDashboardComponent } from './ev-dashboard/ev-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { evHomeComponent } from './ev-home/ev-home.component';

import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatChipsModule } from '@angular/material/chips';

import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    evHeaderComponent,
    evDashboardComponent,
    SidebarComponent,
    evHomeComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    // font awesome icon
    FontAwesomeModule,
    // bootstrap
    NgbModule,
    // Material UI Imports
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDialogModule,
    // Material Form Field
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    DataTablesModule,
    HttpClientModule,
    AngularEditorModule,
    MatChipsModule,
    NgApexchartsModule

  ],
  exports: [
    evHeaderComponent,
    evDashboardComponent,
    SidebarComponent,


  ],

})
export class evModule { }
