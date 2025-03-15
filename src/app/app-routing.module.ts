import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: "login",
    loadChildren:() =>
      import("./pages/login/login.module").then((m) => m.LoginModule)
  },
  {
    path: "register",
    loadChildren:() =>
      import('./pages/register/register.module').then((m) => m.RegisterModule)
  },
  { path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule)
      }
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
