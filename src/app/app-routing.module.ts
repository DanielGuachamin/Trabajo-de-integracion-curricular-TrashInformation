import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/authpages/login/login.component';
import { RegisterComponent } from './components/authpages/register/register.component';
import { RecoverPasswordComponent} from './components/authpages/recover-password/recover-password.component'


import { DashboardAdminComponent } from './components/adminpages/dashboard-admin/dashboard-admin.component';
import { NewsAdminComponent } from './components/adminpages/dashboard-admin/news-admin/news-admin.component';
import { VideosAdminComponent } from './components/adminpages/dashboard-admin/videos-admin/videos-admin.component';
import { RecommendationsAdminComponent } from './components/adminpages/dashboard-admin/recommendations-admin/recommendations-admin.component';
import { ContactsAdminComponent } from './components/adminpages/dashboard-admin/contacts-admin/contacts-admin.component';
import { SuggestionsAdminComponent } from './components/adminpages/dashboard-admin/suggestions-admin/suggestions-admin.component';

import { DashboardUserComponent } from './components/userpages/dashboard-user/dashboard-user.component';
import { NewsUserComponent } from './components/userpages/dashboard-user/news-user/news-user.component';
import { VideosUserComponent } from './components/userpages/dashboard-user/videos-user/videos-user.component';
import { RecommendatiosUserComponent } from './components/userpages/dashboard-user/recommendatios-user/recommendatios-user.component';
import { ContactsUserComponent } from './components/userpages/dashboard-user/contacts-user/contacts-user.component';
import { SuggestionsUserComponent } from './components/userpages/dashboard-user/suggestions-user/suggestions-user.component';
import { ProfileUserComponent } from './components/userpages/dashboard-user/profile-user/profile-user.component';

import { AuthenticationGuard } from './guards/authentication.guard';
import { AdminVerificationGuard } from './guards/admin-verification.guard';
import { ClientVerificationGuard } from './guards/client-verification.guard';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    children: [
      {
        path: '',
        component: NewsAdminComponent
      },
      {
        path: 'videos-admin',
        component: VideosAdminComponent
      },
      {
        path: 'recommendations-admin',
        component: RecommendationsAdminComponent
      },
      {
        path: 'contacts-admin',
        component: ContactsAdminComponent
      },
      {
        path: 'suggestions-admin',
        component: SuggestionsAdminComponent
      }
    ],
    canActivate: [AuthenticationGuard, AdminVerificationGuard]
  },
  { 
    path: 'dashboard-user',
    component: DashboardUserComponent,
    children: [
      {
        path: '',
        component: ContactsUserComponent
      },
      {
        path: 'videos-user',
        component: VideosUserComponent
      },
      {
        path: 'recommendations-user',
        component: RecommendatiosUserComponent
      },
      {
        path: 'news-user',
        component: NewsUserComponent
      },
      {
        path: 'suggestions-user',
        component: SuggestionsUserComponent
      },
      {
        path: 'profile-user',
        component: ProfileUserComponent
      }
    ],
    canActivate: [AuthenticationGuard, ClientVerificationGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'recover-password', 
    component: RecoverPasswordComponent
  },
  {
    path: 'error-404/:type',
    component: Error404Component
  },
  { 
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
