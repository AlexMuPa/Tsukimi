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
    if(sessionStorage.getItem('access_token')) this.login= true;
    else this.login=false;
  }

  ngOnInit(): void {
  }

  changeBars() {
    if(this.bars) this.bars =false;
    else {
      this.bars= true;
      this.user = false;
    }
  }

  changeUser() {
    if(this.user) this.user =false;
    else {
      this.user= true;
      this.bars = false;
    }
  }

  logout(){
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('userId');
    this.login=false;
    //this.sharingService.setLoged({isLoged: false});
    this.router.navigateByUrl('');
  }

}
