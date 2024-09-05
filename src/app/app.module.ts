import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './component/movies-list/movies-list.component';
import { MoviesSearchComponent } from './component/movies-search/movies-search.component';
import { SearchComponent } from './component/search/search.component';
import { RxjsErrorHandlingComponent } from './component/rxjs-error-handling/rxjs-error-handling.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MoviesSearchComponent,
    SearchComponent,
    RxjsErrorHandlingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
