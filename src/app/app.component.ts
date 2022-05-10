import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, ResolveEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  outlet!: RouterOutlet;
  constructor(private router: Router){}

  onActiveOutlet(component: Component) {
    let previousUrl = this.router.url;
    console.log(component);
    console.log(previousUrl);
        this.router.events.subscribe(
          event => {
            console.log(event);
            if (event instanceof NavigationError) {
              console.log(component);
              this.router.navigateByUrl(event.url);
            }
        }
    )

}
}
