import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KanaModule } from './kana/kana.module';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'kana',
    loadChildren: () => import('./kana/kana.module').then(m => m.KanaModule)
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
