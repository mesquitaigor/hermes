import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/login/login.page.module').then(
        (m) => m.LoginPageModule
      ),
      canActivate: [authGuard({reverse: true})],
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home/home.module').then(
        (m) => m.HomePageModule
      ),
    canActivate: [authGuard()],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
