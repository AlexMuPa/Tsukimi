import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {path: '', component: ArticleComponent}
    ]
  }
 ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrammarRoutingModule { }
