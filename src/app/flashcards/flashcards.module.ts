import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FlashcardsHomeComponent } from './components/flashcars/components/flashcards-home/flashcards-home.component';
import { FlashcardFormComponent } from './components/flashcard-form/flashcard-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashcardsReviewComponent } from './components/flashcards-review/flashcards-review.component';
import {NgxFitTextModule } from '@pikselin/ngx-fittext';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [FlashcardsHomeComponent, FlashcardFormComponent, FlashcardsReviewComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxFitTextModule,
    ChartsModule
  ]
})
export class FlashcardsModule { }
