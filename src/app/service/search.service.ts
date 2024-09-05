import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Movie, Director } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Jumanji',
      synopsis:
        'Explore the mysteries and wonders hidden within the enchanted forest.',
      directorId: 101,
      releaseDate: new Date('2024-05-15T09:00:00Z'),
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMDcyZjU4OTQtNzBiOC00NGFlLThlMWItZDVlYTU4MjBlYjE5XkEyXkFqcGdeQWFybm8@._V1_QL75_UY281_CR36,0,500,281_.jpg',
    },
    {
      id: 2,
      title: 'KingSlay',
      synopsis:
        'A thrilling adventure through space and the unknown reaches of the galaxy.',
      directorId: 102,
      releaseDate: new Date('2024-06-20T10:30:00Z'),
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMDcyZjU4OTQtNzBiOC00NGFlLThlMWItZDVlYTU4MjBlYjE5XkEyXkFqcGdeQWFybm8@._V1_QL75_UY281_CR36,0,500,281_.jpg',
    },
    {
      id: 3,
      title: 'Ocean Shark',
      synopsis:
        'Dive deep into the ocean to uncover the secrets and creatures that dwell beneath.',
      directorId: 103,
      releaseDate: new Date('2024-07-10T11:45:00Z'),
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMDcyZjU4OTQtNzBiOC00NGFlLThlMWItZDVlYTU4MjBlYjE5XkEyXkFqcGdeQWFybm8@._V1_QL75_UY281_CR36,0,500,281_.jpg',
    },
    {
      id: 4,
      title: 'Shadows Man',
      synopsis:
        'Unravel the dark secrets of a city plagued by crime and corruption.',
      directorId: 104,
      releaseDate: new Date('2024-08-25T14:20:00Z'),
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMDcyZjU4OTQtNzBiOC00NGFlLThlMWItZDVlYTU4MjBlYjE5XkEyXkFqcGdeQWFybm8@._V1_QL75_UY281_CR36,0,500,281_.jpg',
    },
    {
      id: 5,
      title: 'Wings of Freedom',
      synopsis:
        'Follow the journey of a young woman fighting for her freedom in a dystopian world.',
      directorId: 105,
      releaseDate: new Date('2024-09-30T16:00:00Z'),
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMDcyZjU4OTQtNzBiOC00NGFlLThlMWItZDVlYTU4MjBlYjE5XkEyXkFqcGdeQWFybm8@._V1_QL75_UY281_CR36,0,500,281_.jpg',
    },
    {
      id: 6,
      title: 'Mystic Mountains',
      synopsis:
        'A group of adventurers embarks on a perilous journey to uncover the hidden treasures of the Mystic Mountains.',
      directorId: 106,
      releaseDate: new Date('2024-10-15T18:00:00Z'),
      coverImage:
        'https://m.media-amazon.com/images/M/MV5BMDcyZjU4OTQtNzBiOC00NGFlLThlMWItZDVlYTU4MjBlYjE5XkEyXkFqcGdeQWFybm8@._V1_QL75_UY281_CR36,0,500,281_.jpg',
    },
  ];

  private directors: Director[] = [
    {
      id: 101,
      name: 'Luna Stargazer',
    },
    {
      id: 102,
      name: 'Orion Nightfall',
    },
    {
      id: 103,
      name: 'Marina Deep',
    },
  ];

  constructor() {}

  getAllMovies(): Observable<Movie[]> {
    return of(this.movies).pipe(delay(1000));
  }

  getAllDirectors(): Observable<Director[]> {
    return of(this.directors).pipe(delay(1000));
  }

  searchMovies(term: string): Observable<Movie[]> {
    return of(this.movies).pipe(
      delay(500),
      map((movies) =>
        movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(term.toLowerCase()) ||
            movie.synopsis.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  getDirectorById(directorId: number): Observable<Director> {
    const director = this.directors.find((d) => d.id === directorId);
    return of(director ?? { id: -1, name: 'Unknown' }).pipe(delay(500));
  }
}
