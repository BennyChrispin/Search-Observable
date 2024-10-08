import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSearchComponent } from './movies-search.component';

describe('MoviesSearchComponent', () => {
  let component: MoviesSearchComponent;
  let fixture: ComponentFixture<MoviesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
