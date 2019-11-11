import {Component, OnInit} from '@angular/core';
import {MoviedbService} from '../../services/moviedb.service';

@Component({
  selector: 'app-store-session',
  templateUrl: './store-session.component.html',
  styleUrls: ['./store-session.component.scss']
})
export class StoreSessionComponent implements OnInit {

  constructor(private moviedb: MoviedbService) {
    this.moviedb.storeSession();
  }

  ngOnInit() {
  }

}
