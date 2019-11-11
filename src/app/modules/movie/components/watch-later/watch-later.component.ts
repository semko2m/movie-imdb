import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {MoviedbService} from '../../services/moviedb.service';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit {
  public userIsLoggedIn = false;
  public watchLaterList = [];
  @Input() items: any[] = [];

  constructor(private cookieService: CookieService, private moviedb: MoviedbService) {
    if (this.cookieService.check('AccountId')) {
      this.userIsLoggedIn = true;
      this.moviedb.getWatchLaterList().subscribe((data: any) => {
        if (data) {
          this.watchLaterList = data;
        }
      });
    }
  }

  ngOnInit() {
  }

}
