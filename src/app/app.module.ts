import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/authpages/login/login.component';
import { RegisterComponent } from './components/authpages/register/register.component';
import { RecoverPasswordComponent } from './components/authpages/recover-password/recover-password.component';

import { DashboardAdminComponent } from './components/adminpages/dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './components/userpages/dashboard-user/dashboard-user.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import  {HttpClientModule}  from "@angular/common/http";

import { DashboardAdminModule } from './components/adminpages/dashboard-admin/dashboard-admin.module';
import { DashboardUserModule } from './components/userpages/dashboard-user/dashboard-user.module';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { Error404Component } from './components/error404/error404.component';

//import { MapComponent } from './components/dialogs/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardAdminComponent,
    DashboardUserComponent,
    RecoverPasswordComponent,
    Error404Component,
    //MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    DashboardAdminModule,
    DashboardUserModule,
    SharedModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
