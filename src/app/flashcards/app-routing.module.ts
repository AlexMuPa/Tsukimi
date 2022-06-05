import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardsHomeComponent } from './components/flashcars/components/flashcards-home/flashcards-home.component';
import { PermissionsGuard } from '../guards/permissions.guard';
import { FlashcardsReviewComponent } from './components/flashcards-review/flashcards-review.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {path: '', component: FlashcardsHomeComponent, canActivate: [PermissionsGuard]},
      {path: 'review', component: FlashcardsReviewComponent, canActivate: [PermissionsGuard]}
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AppRoutingModule { }
