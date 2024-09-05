import { Component, OnInit } from '@angular/core';
import { of, throwError, timer } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-error-handling',
  templateUrl: './rxjs-error-handling.component.html',
  styleUrls: ['./rxjs-error-handling.component.css'],
})
export class RxjsErrorHandlingComponent implements OnInit {
  status: string = '';
  result: string = '';
  loading: boolean = false;

  ngOnInit(): void {}

  simulateHttpRequest() {
    return timer(1000).pipe(
      map(() => {
        const success = Math.random() > 0.5;
        if (success) {
          return 'Request successful!';
        } else {
          throw new Error('Request failed!');
        }
      }),
      retry(3),
      catchError((error) => {
        console.error('Handling error:', error);
        return of('Fallback response');
      }),
      tap({
        next: (value) => console.log('Received value:', value),
        error: (error) => console.log('Received error:', error),
        complete: () => console.log('Request completed'),
      })
    );
  }

  fetchData(): void {
    this.status = '';
    this.result = '';
    this.loading = true;

    this.simulateHttpRequest().subscribe({
      next: (value) => {
        this.status = 'Success';
        this.result = value;
      },
      error: () => {
        this.status = 'Error';
        this.result = 'Fallback response';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
