import { TestBed } from '@angular/core/testing';

import { FlashcardsServiceService } from './flashcards-service.service';

describe('FlashcardsServiceService', () => {
  let service: FlashcardsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
