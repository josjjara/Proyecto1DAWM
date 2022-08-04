import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { DevelopersComponent} from './developers/developers.component';
import { GamesComponent} from './games/games.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApiViewComponent } from './api-view/api-view.component';

const routes: Routes = [
  {path:"splash", component: SplashComponent},
  {path:"login", component: LoginComponent},
  {path:"home",component: HomeComponent},
  {path:"developers", component: DevelopersComponent },
  {path:"games", component: GamesComponent },
  {path:"api-view", component: ApiViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
