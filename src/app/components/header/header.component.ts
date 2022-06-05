import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bars: boolean;
  user: boolean;
  login: boolean;
  constructor(
    private router: Router,
    private sharingService: SharingService
    ) {
    this.bars=false;
    this.user=false;
    this.sharingService.getLoged().subscribe(
      loged => this.login = loged.isLoged
    );
    this.sharingService.getMenu().subscribe(
      menu => {
        this.bars = menu.bars;
        this.user = menu.user
      }
    )
    if(sessionStorage.getItem('access_token')) this.login= true;
    else this.login=false;
  }

  ngOnInit(): void {
  }

  changeBars() {
    if(this.bars) this.sharingService.setMenu({bars: false, user:false});
    else {
      this.sharingService.setMenu({bars: true, user:false});
    }
  }

  changeUser() {
    if(this.user) this.sharingService.setMenu({bars: false, user:false});
    else {
      this.sharingService.setMenu({bars: false, user:true});
    }
  }

  logout(){
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('userId');
    this.login=false;
    this.router.navigateByUrl('');
  }

}
