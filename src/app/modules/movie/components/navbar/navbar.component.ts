import {Component, OnInit} from '@angular/core';
import {MoviedbService} from '../../services/moviedb.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private moviedb: MoviedbService) {
  }

  ngOnInit() {
  }

  login() {
    this.moviedb.login();
  }

}
