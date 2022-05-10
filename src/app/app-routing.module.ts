import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'kana',
    loadChildren: () => import('./kana/kana.module').then(m => m.KanaModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/user.module').then(m => m.UserModule)
  },
  {
    path: 'tarjetas',
    loadChildren: () => import('./flashcards/flashcards.module').then(m => m.FlashcardsModule)
  },
  {
    path: 'gramatica',
    loadChildren: () => import('./grammar/grammar.module').then(m => m.GrammarModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
