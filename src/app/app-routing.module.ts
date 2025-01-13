import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./ev/ev.module').then(mod=>mod.evModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled', initialNavigation: 'enabledBlocking',
    preloadingStrategy: PreloadAllModules,
   })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
