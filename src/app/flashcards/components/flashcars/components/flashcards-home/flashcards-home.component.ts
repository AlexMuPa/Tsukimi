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

  reviews: string | null;
  form: boolean | null;
  total: number | null;
  loading: boolean;
  error: boolean;
  errorReviews: boolean;
  errorFlashcards: boolean;
  showChart: boolean;

  lineChartData: ChartDataSets[] = [];
  lineChartLabel: string[] = ['%', 'Fecha'];
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
    this.loading = false;
    this.error = false;
    this.errorReviews = false;
    this.errorFlashcards= false;
    this.showChart = false;
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
    this.flashcardService.getFlashcards(sessionStorage.getItem('userId') as string).subscribe(
      (response)=>{
      if(response.length ==0) this.reviews = '0';
      else {
        this.reviews = response.length.toString();
      }
      },
      () => {
        this.reviews = 'Error al conectar';
        this.errorReviews = true;
      })
  }

  getAllFlashcards(){
    this.flashcardService.getAllFlashcards(sessionStorage.getItem('userId') as string).subscribe(
      (response)=>{
      if(response.length ==0) this.total = 0;
      else {
        this.total = response.length;
      }
    },
    () => {
      this.errorFlashcards = true;
    })
  }

  getData(){
    this.loading = true;
    this.error = false;
    this.flashcardService.getData(sessionStorage.getItem('userId') as string).subscribe(
      (response)=>{
      console.log(response);
      if(response.length >0) {
        this.lineChartData = [
          {data: response.map(item => (item.correct/(item.correct+item.incorrect)*100)), label: 'Respuestas correctas en %'},
          {data: response.map(item => (item.incorrect/(item.correct+item.incorrect)*100)), label: 'Respuestas incorrectas en %'}
        ];
        this.lineChartLabel = response.map( item => item.days);
        this.showChart = true;
      }
      this.loading = false;
    },
    () =>{
      this.error = true;
      this.loading = false;
    }
    )
  }


  flashcardForm(){
    this.form =true;
  }

  startReview(){
    this.router.navigateByUrl('tarjetas/review')
  }
}
