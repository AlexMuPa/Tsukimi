import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  bars: boolean;
  user: boolean;
  constructor() {
    this.bars=false;
    this.user=false;
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

}
