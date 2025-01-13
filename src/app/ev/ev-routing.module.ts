import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { evLoginComponent } from './ev-login/ev-login.component';
import { evHomeComponent } from './ev-home/ev-home.component';
import { evDashboardComponent } from './ev-dashboard/ev-dashboard.component';

import { adminAuthGuard } from './auth-guard/admin-auth.guard';

const routes: Routes = [
  {
    path: 'home', component: evHomeComponent, children: [
      { path: 'dashboard', component: evDashboardComponent },
     
    ],
    canActivate:[adminAuthGuard],
  },
  { path: '', component: evLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
