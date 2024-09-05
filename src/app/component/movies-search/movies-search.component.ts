import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  filter,
  startWith,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { Movie } from '../../models/movies';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.css'],
})
export class MoviesSearchComponent implements OnInit {
  searchControl = new FormControl('');
  errorMsg: string = '';
  allMovies$: Observable<Movie[]> = of([]);
  filteredMovies$: Observable<Movie[]> = of([]);
  loading: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.fetchAllMovies();
    this.initializeSearch();
  }

  fetchAllMovies(): void {
    this.allMovies$ = this.searchService.getAllMovies().pipe(
      catchError((error) => {
        this.errorMsg = 'Failed to load movies.';
        return of([]);
      })
    );
  }

  initializeSearch(): void {
    this.filteredMovies$ = combineLatest([
      this.allMovies$,
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        filter((term: string | null): term is string => term !== null)
      ),
    ]).pipe(
      switchMap(([movies, term]) => {
        if (term.trim().length < 3 && term.trim().length > 0) {
          this.errorMsg = 'Please enter at least 3 characters to search.';
          return of([]);
        } else {
          this.errorMsg = '';
          if (term.trim().length === 0) {
            return of(movies);
          }
          return this.searchService.searchMovies(term).pipe(
            catchError((error) => {
              this.errorMsg = 'Error occurred while searching.';
              return of([]);
            })
          );
        }
      })
    );
  }

  triggerSearch(): void {
    this.searchControl.setValue(this.searchControl.value);
  }
}
