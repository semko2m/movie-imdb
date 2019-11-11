import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MovieComponent} from './components/movie/movie.component';
import {SearchComponent} from './components/search/search.component';
import {CardsComponent} from './components/cards/cards.component';
import {MovieImagePipe} from './pipes/movie-image.pipe';
import {LoadingComponent} from './components/shared/loading/loading.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import {MoviedbService} from './services/moviedb.service';
import {AppRoutingModule} from '../../app-routing.module';
import { StoreSessionComponent } from './components/store-session/store-session.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    MovieComponent,
    SearchComponent,
    CardsComponent,
    MovieImagePipe,
    LoadingComponent,
    StoreSessionComponent,
    WatchLaterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent
  ],
})
export class MovieModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MovieModule,
      providers: [MoviedbService]
    };
  }
}
