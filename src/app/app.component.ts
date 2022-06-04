import { Component, OnInit } from '@angular/core';
import {NavigationError, Router, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  outlet!: RouterOutlet;
  constructor(private router: Router, private metaService: Meta){}

  onActiveOutlet(component: Component) {
    let previousUrl = this.router.url;
        this.router.events.subscribe(
          event => {
            if (event instanceof NavigationError) {
              this.router.navigateByUrl(event.url);
            }
        }
    )

}

  ngOnInit(): void {
    this.metaService.addTags([
      {name: 'keywords', content: 'Japonés, Autodidacta, Hiragana, Katakana, Particulas, Repetición Espaciada, Flashcards'},
      {name: 'description', content: 'Web para el estudio autodidacta de japonés'}
    ]);
  }
}
