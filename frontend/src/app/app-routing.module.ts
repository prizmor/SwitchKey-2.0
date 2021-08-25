import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {VoidComponent} from './void/void.component';

const routes: Routes = [
  {
    path: 'auth/:type',
    component: AuthComponent
  },
  {
    path: '',
    component: VoidComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
