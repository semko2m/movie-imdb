import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/movie/components/home/home.component';
import {SearchComponent} from './modules/movie/components/search/search.component';
import {MovieComponent} from './modules/movie/components/movie/movie.component';
import {StoreSessionComponent} from './modules/movie/components/store-session/store-session.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'storeSession', component: StoreSessionComponent},
  {path: 'movie-imdb/storeSession', component: StoreSessionComponent},
  {path: 'movie/:id', component: MovieComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
