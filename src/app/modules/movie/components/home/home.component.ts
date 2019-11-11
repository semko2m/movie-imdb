import {Component} from '@angular/core';
import {MoviedbService} from '../../services/moviedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  newMovie: any[] = [];
  favorites: any[] = [];

  loading: boolean;

  constructor(private moviedb: MoviedbService) {

    this.loading = true;
    this.moviedb.getDiscoverMovies()
      .subscribe((data: any) => {
        console.log(data);
        this.moviedb.getFavorite().subscribe((data2: any) => {
          if (data2.length > 0) {
            this.favorites = data2;
            data.forEach(oneNewMovie => {
              let fav = false;
              data2.forEach(oneFavoriteMovie => {
                if (oneNewMovie.id === oneFavoriteMovie.id) {
                  fav = true;
                }
              });
              oneNewMovie.favorite = fav;
              this.newMovie.push(oneNewMovie);
            });
          } else {
            this.newMovie = data;
          }
          this.loading = false;
        });
      });

  }

}
