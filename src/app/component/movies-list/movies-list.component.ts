import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Director, Movie } from '../../models/movies';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie[] = [];
  searchTerm: string = '';
  directors$: Observable<{ [id: number]: Director }> = of({});

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.searchService.getAllMovies().subscribe((movies) => {
      this.movies = movies;
      this.directors$ = this.searchService.getAllDirectors().pipe(
        switchMap((directors) => {
          const directorMap = directors.reduce((acc, director) => {
            acc[director.id] = director;
            return acc;
          }, {} as { [id: number]: Director });
          return of(directorMap);
        })
      );
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.searchService.searchMovies(this.searchTerm).subscribe((movies) => {
        this.movies = movies;
      });
    } else {
      this.loadMovies();
    }
  }

  getDirectorName(directorId: number): Observable<string> {
    return this.directors$.pipe(
      switchMap((directors) => of(directors[directorId]?.name ?? 'Unknown'))
    );
  }
}
