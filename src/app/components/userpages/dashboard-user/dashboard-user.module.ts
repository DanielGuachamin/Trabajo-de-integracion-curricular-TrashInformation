import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from "@angular/youtube-player";

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { NewsUserComponent } from './news-user/news-user.component';
import { VideosUserComponent } from './videos-user/videos-user.component';
import { RecommendatiosUserComponent } from './recommendatios-user/recommendatios-user.component';
import { ContactsUserComponent } from './contacts-user/contacts-user.component';
import { SuggestionsUserComponent } from './suggestions-user/suggestions-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { MapComponent } from '../../../components/dialogs/map/map.component';

@NgModule({
  declarations: [
    NewsUserComponent,
    VideosUserComponent,
    RecommendatiosUserComponent,
    ContactsUserComponent,
    SuggestionsUserComponent,
    ProfileUserComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    DashboardUserRoutingModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    YouTubePlayerModule,
    SharedModule
  ],
  entryComponents: [MapComponent]
})
export class DashboardUserModule { }
