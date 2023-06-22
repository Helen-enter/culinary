import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRecipesComponent } from './book-recipes.component';

describe('BookRecipesComponent', () => {
  let component: BookRecipesComponent;
  let fixture: ComponentFixture<BookRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
