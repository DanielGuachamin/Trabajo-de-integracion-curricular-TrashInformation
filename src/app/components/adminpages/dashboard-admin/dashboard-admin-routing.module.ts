import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsAdminComponent } from './contacts-admin/contacts-admin.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { NewsAdminComponent } from './news-admin/news-admin.component';
import { RecommendationsAdminComponent } from './recommendations-admin/recommendations-admin.component';
import { SuggestionsAdminComponent } from './suggestions-admin/suggestions-admin.component';
import { VideosAdminComponent } from './videos-admin/videos-admin.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
