import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardUserComponent} from './dashboard-user.component';
import { NewsUserComponent } from './news-user/news-user.component';
import { VideosUserComponent } from './videos-user/videos-user.component';
import { RecommendatiosUserComponent } from './recommendatios-user/recommendatios-user.component';
import { ContactsUserComponent } from './contacts-user/contacts-user.component';
import { SuggestionsUserComponent } from './suggestions-user/suggestions-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

const routes: Routes = [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
