import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrammarRoutingModule } from './grammar-routing.module';
import { ArticleComponent } from './components/article/article.component';


@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    GrammarRoutingModule
  ]
})
export class GrammarModule { }
