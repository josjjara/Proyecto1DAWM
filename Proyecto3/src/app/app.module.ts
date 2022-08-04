import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './splash/splash.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DevelopersComponent } from './developers/developers.component';
import { GamesComponent } from './games/games.component';
import { ApiViewComponent } from './api-view/api-view.component';
import {MatCardModule} from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';




@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LoginComponent,
    HomeComponent,
    DevelopersComponent,
    GamesComponent,
    ApiViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
