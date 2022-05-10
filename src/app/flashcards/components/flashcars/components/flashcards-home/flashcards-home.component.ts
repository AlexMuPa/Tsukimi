import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardsServiceService } from 'src/app/flashcards/services/flashcards-service.service';
import { SharingService } from 'src/app/services/sharing.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-flashcards-home',
  templateUrl: './flashcards-home.component.html',
  styleUrls: ['./flashcards-home.component.css']
})
export class FlashcardsHomeComponent implements OnInit {

  reviews: number | null;
  form: boolean | null;
  total: number | null;

  lineChartData: ChartDataSets[] = [];
  lineChartLabel: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
  };
  lineChartType: ChartType = 'line';
  public lineChartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(7,167,83,0.2)',
      borderColor: 'rgba(7,167,83,0.2)',
      pointBackgroundColor: 'rgba(7,167,83,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(7,167,83,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  constructor(
    private flashcardService: FlashcardsServiceService,
    private sharingService: SharingService,
    private router: Router
    ) {
    this.reviews = null;
    this.total = null;
    this.sharingService.getModal().subscribe((modal)=>{
      this.form = modal.isActive;
     this.getFlashcards();
     this.getAllFlashcards();
    })
    this.form = null;
   }

  ngOnInit(): void {
    this.getFlashcards();
    this.getAllFlashcards();
    this.getData();
  }

  getFlashcards(){
    this.flashcardService.getFlashcards(sessionStorage.getItem('userId') as string).subscribe((response)=>{
      if(response.length ==0) this.reviews = 0;
      else {
        this.reviews = response.length;
      }
    })
  }

  getAllFlashcards(){
    this.flashcardService.getAllFlashcards(sessionStorage.getItem('userId') as string).subscribe((response)=>{
      if(response.length ==0) this.total = 0;
      else {
        this.total = response.length;
      }
    })
  }

  getData(){
    this.flashcardService.getData(sessionStorage.getItem('userId') as string).subscribe((response)=>{
      console.log(response);
      this.lineChartData = [
        {data: response.map(item => (item.correct/(item.correct+item.incorrect))), label: 'Respuestas correctas'},
        {data: response.map(item => (item.incorrect/(item.correct+item.incorrect))), label: 'Respuestas incorrectas'}
      ];
      this.lineChartLabel = response.map( item => item.days);
    })
  }


  flashcardForm(){
    this.form =true;
  }

  startReview(){
    this.router.navigateByUrl('tarjetas/review')
  }
}
