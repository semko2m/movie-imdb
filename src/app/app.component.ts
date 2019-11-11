import {Component} from '@angular/core';
import {MoviedbService} from './modules/movie/services/moviedb.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movies-imdb';

  /**
   * Login if user does not have session id stored in cookie
   * We login user like questw
   * @param moviedb service for imdb
   * @param cookieService for setting and reading cookies
   */
  constructor(private moviedb: MoviedbService, private cookieService: CookieService) {
    const sessionExists: boolean = cookieService.check('SessionId');
    // this.moviedb.login();

    // if (!sessionExists) {
    //
    //   this.moviedb.login();
    // } else {
    //   const cookieValue = this.cookieService.get('SessionId');
    //   this.moviedb.setSessionId(cookieValue);
    // }
  }

  public storeSession() {
    this.moviedb.storeSession();
  }
}
