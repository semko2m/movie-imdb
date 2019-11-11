import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MoviedbService} from '../../services/moviedb.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() items: any[] = [];
  public itemsAdded: any [] = [];

  constructor(private router: Router, private moviedb: MoviedbService) {
  }

  ngOnInit() {
    console.log(this.items);
    setTimeout(() => {

    }, 100);
  }

  /**
   * Go to details of the movie
   * @param item contains all infos about the movie
   */
  watchMovie(item: any) {
    let movieId;
    movieId = item.id;
    this.router.navigate(['/movie', movieId]);
  }

  /**
   * Set or unset favorite
   * @param item movie
   * @param favorite true or false
   */
  saveFavorite(item: any) {
    item.favorite = !item.favorite;
    this.moviedb.setFavorite('movie', item.id, item.favorite).subscribe(result => {
    });
  }

  /**
   * Set or unset favorite
   * @param item movie
   * @param favorite true or false
   */
  saveWatchLater(item: any) {
    this.moviedb.setWatchLater('movie', item.id, true).subscribe(result => {
      this.itemsAdded.push({
        original_title: item.title
      });
      alert('Movie is added to your watch list');
      this.moviedb.storeSession();
    });
  }

}
