import { Component, OnInit } from '@angular/core';
import { MoviedbService} from '../../services/moviedb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  movie: any[] = [];
  loading: boolean;

  constructor(private moviedb: MoviedbService) {}

  /**
   * Search movie
   * @param term for searching
   */
  search(term: string) {
    this.loading = true;
    this.moviedb.getSearchMovie(term).subscribe((data: any) => {
      this.movie = data;
      this.loading = false;
    });
  }
}
