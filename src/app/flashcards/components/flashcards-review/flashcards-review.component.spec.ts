import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsReviewComponent } from './flashcards-review.component';

describe('FlashcardsReviewComponent', () => {
  let component: FlashcardsReviewComponent;
  let fixture: ComponentFixture<FlashcardsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
