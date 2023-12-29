import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/pages/register/register.component').then(
      (c) => c.RegisterComponent
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
