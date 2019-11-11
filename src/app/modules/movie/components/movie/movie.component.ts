import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoviedbService} from '../../services/moviedb.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  movie: any = {};

  loadingMovie: boolean;

  constructor(private router: ActivatedRoute,
              private moviedb: MoviedbService) {

    this.loadingMovie = true;

    this.router.params.subscribe(params => {
      console.log(params);

      this.moviedb.getMovie(params['id'])
        .subscribe(movie => {
          console.log(movie);
          this.movie = movie;
          this.loadingMovie = false;
        });
    });

  }

}

