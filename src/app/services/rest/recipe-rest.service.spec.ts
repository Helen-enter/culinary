import { TestBed } from '@angular/core/testing';

import { RecipeRestService } from './recipe-rest.service';

describe('RecipeRestService', () => {
  let service: RecipeRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
