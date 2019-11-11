import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';


import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  private apikey: string = '035283cdefc22635fc0ddfadd45cf266';
  private urlMoviedb: string = 'https://api.themoviedb.org/3';
  public requestToken: string;
  public sessionId: string;
  public accountId: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  /**
   * Login user
   */
  public login() {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apikey}&language=eng&callback=JSONP_CALLBACK`;
    this.http.jsonp(url, '').subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.cookieService.set('request_token', data.request_token);
        window.location.href = 'https://www.themoviedb.org/authenticate/' + data.request_token + '?redirect_to=' + window.location.origin + '/movie-imdb/storeSession';
      } else {
        console.warn('Auth failed. Please try again or contact admin.');
      }
    });
  }

  public storeSession() {
    const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apikey}`;
    this.requestToken = this.cookieService.get('request_token');
    const body = {
      request_token: this.requestToken
    };
    this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe((data: any) => {
      this.sessionId = data.session_id;
      this.cookieService.set('SessionId', this.sessionId);
      this.storeAccountId();
    });
  }

  private storeAccountId() {
    this.sessionId = this.cookieService.get('SessionId');
    const url = `https://api.themoviedb.org/3/account?api_key=${this.apikey}&session_id=${this.sessionId}&language=eng&callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, '').subscribe((data: any) => {
      console.log(data);
      this.accountId = data.id;
      console.log(data.id);
      this.cookieService.set('AccountId', this.accountId);
    });
  }


  /**
   * Get gery prepared
   * @param query for preparing
   */
  public getQuery(query: string) {
    const url = `https://api.themoviedb.org/3${query}&api_key=${
      this.apikey
      }&language=eng&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, '');
  }

  /**
   * Get query prepared for movie
   * @param query for preparing
   */
  public getQueryforMovie(query: string) {
    const url = `https://api.themoviedb.org/3${query}?api_key=${
      this.apikey
      }&language=eng&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, '');
  }

  /**
   * Get Discover movies
   */
  public getDiscoverMovies() {
    return this.getQuery('/discover/movie?sort_by=popularity.desc').pipe(
      map((data: any) => data.results)
    );
  }

  /**
   * Get results for search
   * @param termino contains search string
   */
  public getSearchMovie(termino: string) {
    return this.getQuery(
      `/search/movie?query=${termino}&sort_by=popularity.desc`
    ).pipe(map((data: any) => data.results));
  }


  /**
   * Get movie by ID
   * @param id of the movie
   */
  public getMovie(id: string) {
    return this.getQueryforMovie(`/movie/${id}`).pipe(
      map((data: any) => data)
    );
  }

  /**
   * Set favorite for some user.
   * @param mediaType movie of serial show
   * @param mediaId of the movie
   * @param favorite true or false
   */
  public setFavorite(mediaType: string, mediaId: number, favorite: boolean) {
    const body = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: favorite
    };
    if (!this.cookieService.check('SessionId') || !this.cookieService.check('AccountId')) {
      alert('Please login to use this function');
    }
    this.accountId = this.cookieService.get('AccountId');
    this.sessionId = this.cookieService.get('SessionId');
    const url = `https://api.themoviedb.org/3/account/${this.accountId}/favorite?api_key=${this.apikey}&session_id=${this.sessionId}`;

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map((data: any) => data)
    );

  }

  /**
   * Set watchlist for some user.
   * @param mediaType movie of serial show
   * @param mediaId of the movie
   * @param watchlist true or false
   */
  public setWatchLater(mediaType: string, mediaId: number, watchlist: boolean) {
    const body = {
      media_type: mediaType,
      media_id: mediaId,
      watchlist: watchlist
    };
    if (!this.cookieService.check('SessionId') || !this.cookieService.check('AccountId')) {
      alert('Please login to use this function');
    }
    this.accountId = this.cookieService.get('AccountId');
    this.sessionId = this.cookieService.get('SessionId');
    const url = `https://api.themoviedb.org/3/account/${this.accountId}/watchlist?api_key=${this.apikey}&session_id=${this.sessionId}`;

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map((data: any) => data)
    );
  }

  public getFavorite() {
    if (this.cookieService.check('AccountId')) {
      this.accountId = this.cookieService.get('AccountId');
      this.sessionId = this.cookieService.get('SessionId');
      // http://api.themoviedb.org/3/account/{id}/favorite_movies?api_key=###&session_id=###
      const url = `https://api.themoviedb.org/3/account/${this.accountId}/favorite/movies?api_key=${this.apikey}&session_id=${this.sessionId}&language=en-US`;
      return this.http.get(url).pipe(
        map((data: any) => data.results)
      );
    } else {
      return new Observable(observer => observer.next(false));
    }
  }


  public getWatchLaterList() {
    if (this.cookieService.check('AccountId')) {
      this.accountId = this.cookieService.get('AccountId');
      this.sessionId = this.cookieService.get('SessionId');
      // http://api.themoviedb.org/3/account/{id}/favorite_movies?api_key=###&session_id=###
      const url = `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${this.apikey}&session_id=${this.sessionId}&language=en-US`;
      return this.http.get(url).pipe(
        map((data: any) => data.results)
      );
    } else {
      return new Observable(observer => observer.next(false));
    }
  }

}
