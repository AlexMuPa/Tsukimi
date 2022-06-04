import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'Tsukimi', content: '¿Qué puedes estudiar en Tsukimi?' });
   }

  ngOnInit(): void {
  }

}
