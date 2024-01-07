import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCaruoselComponent } from './movie-caruosel.component';

describe('MovieCaruoselComponent', () => {
  let component: MovieCaruoselComponent;
  let fixture: ComponentFixture<MovieCaruoselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCaruoselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieCaruoselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
