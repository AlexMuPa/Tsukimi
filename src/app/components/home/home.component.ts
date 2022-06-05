import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private meta: Meta, private sharingService: SharingService) {
    this.meta.addTag({ name: 'Tsukimi', content: '¿Qué puedes estudiar en Tsukimi?' });
   }

  ngOnInit(): void {
    this.sharingService.setMenu({bars: false, user:false});
  }

}
