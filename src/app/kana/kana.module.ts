import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { SelectionComponent } from './components/selection/selection.component';



@NgModule({
  declarations: [
    SelectionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class KanaModule { }
