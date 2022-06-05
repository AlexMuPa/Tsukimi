
import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/services/sharing.service';
import { FlashcardDTO } from '../../models/flashcard.dto';
import { FlashcardsServiceService } from '../../services/flashcards-service.service';
import { FitTextComponent} from "@pikselin/ngx-fittext";
import { ChartDTO } from '../../models/chart.dto';


@Component({
  selector: 'app-flashcards-review',
  templateUrl: './flashcards-review.component.html',
  styleUrls: ['./flashcards-review.component.css']
})
export class FlashcardsReviewComponent implements OnInit{

  wrongAnswer: boolean | null;
  correctAnswer: boolean | null;
  end: boolean;
  flashcardList: FlashcardDTO[];
  currentFlashcard: FlashcardDTO;
  numberOfErrors: number;
  numberOfSuccess: number;
  buttons: boolean;
  loading: boolean;
  answered: boolean;
  errorMessage: boolean;
  form: boolean;
  edit: string;
  firstReview: boolean;
  errorElements: string[];
  chart: ChartDTO;
  @ViewChild("dynamicFitText") private dynamicFitText!: FitTextComponent;

  constructor(
    private flashcardService: FlashcardsServiceService,
    private router: Router,
    private sharingService: SharingService
    ) {
    this.wrongAnswer = null;
    this.firstReview = true;
    this.errorElements = [];
    this.correctAnswer = null;
    this.answered = false;
    this.errorMessage = false;
    this.numberOfErrors =0;
    this.numberOfSuccess =0;
    this.end = false;
    this.flashcardList = [];
    this.buttons = false;
    this.currentFlashcard = new FlashcardDTO('', '');
    this.form = false;
    this.edit = '';
    this.loading = false;
    this.chart = new ChartDTO(0, 0);
    this.sharingService.getModal().subscribe((modal)=>{
      this.form = modal.isActive;
      if(this.currentFlashcard.id){
        this.flashcardService.getFlashcard(this.currentFlashcard.id).subscribe( (response) => {
          this.currentFlashcard = response;
          this.dynamicFitText.refreshText();
        });
      }
    })
   }

  ngOnInit(): void {
    this.loadFlashcards();
  }


  getChart(){
    this.flashcardService.getData(sessionStorage.getItem('userId') as string).subscribe((response)=>{
      if(new Date(response[response.length-1].days.replace(/:| /g,"-")).getTime() === new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() )).getTime()) {
        this.firstReview = false;
        this.chart = response[response.length-1];
      }
    })
  }

  loadFlashcards(){
    this.flashcardService.getFlashcards(sessionStorage.getItem('userId') as string).subscribe(
      flashcards =>{
        this.currentFlashcard.front ='';
        if(flashcards.length == 0) {
          this.router.navigateByUrl('/tarjetas');
        }
        else{
          this.flashcardList = flashcards
          this.loading = false;
          this.currentFlashcard = this.flashcardList[Math.floor(Math.random() * this.flashcardList.length)];
          this.dynamicFitText.refreshText();
        }
        this.getChart();
      }
    )
  }

  onEnter(e: Event): void {
    this.answered = true;
    if((e.target as HTMLInputElement).value == this.currentFlashcard.back){
      this.correctAnswer = true;
      this.buttons = true;
    }
    else {
      this.wrongAnswer = true;
      this.buttons = true;
    }
    (e.target as HTMLInputElement).value = '';
  }

  answer(outcome: string): void{
    switch(outcome){
      case "error":
        this.currentFlashcard.answer= 'error';
        this.flashcardService.spacedRepetition(this.currentFlashcard).subscribe(
        (response)=> {
          this.currentFlashcard.front = '';
          this.loading = true;
          this.loadFlashcards();
          this.updateChart('error');
          this.errorElements.push(this.currentFlashcard.front);
        },
        (error) => {
          this.currentFlashcard.front = '';
          this.errorMessage = true;
        }
        );
        break;
      case "difficult":
        this.numberOfSuccess++;
        this.currentFlashcard.answer= 'difficult';
        this.flashcardService.spacedRepetition(this.currentFlashcard).subscribe((response)=>{
          this.currentFlashcard.front = '';
          this.loading = true;
          this.loadFlashcards();
          if(this.errorElements.filter(el => el === this.currentFlashcard.front).length == 0) this.updateChart('correct');
          else this.errorElements = this.errorElements.filter(el => el !== this.currentFlashcard.front);
        },
        () => {
          this.currentFlashcard.front = '';
          this.errorMessage = true;
        }
        )
        break;
      case "easy":
        this.numberOfSuccess++;
        this.currentFlashcard.answer= 'easy';
        this.flashcardService.spacedRepetition(this.currentFlashcard).subscribe((response)=>{
          this.currentFlashcard.front = '';
          this.loading = true;
          this.loadFlashcards();
          if(this.errorElements.filter(el => el === this.currentFlashcard.front).length == 0) this.updateChart('correct');
          else this.errorElements = this.errorElements.filter(el => el !== this.currentFlashcard.front);
        },
        () => {
          this.currentFlashcard.front = '';
          this.errorMessage = true;
        }
        )
        break;
    }
    this.buttons = false;
    this.wrongAnswer =null;
    this.correctAnswer = null;
    this.answered = false;
  }

  flashcardForm(){
    this.sharingService.setModal({isActive: true})
    this.edit = this.currentFlashcard.id;
  }

  delete(){
    if(confirm(
      '¿Estás seguro que deseas eliminar la tarjeta?'
    )){
      this.flashcardService.deleteFlashcard(this.currentFlashcard.id).subscribe((response)=>{
        this.loadFlashcards();
      })
    }
    this.buttons = false;
    this.wrongAnswer =null;
    this.correctAnswer = null;
  }
  updateChart(answer: string){
    if(this.firstReview){
      if(answer ==="correct") this.chart.correct = 1;
      else this.chart.incorrect = 1;
      this.chart.days = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() )).toISOString().split('T')[0];
      this.chart.userId = sessionStorage.getItem('userId') as string;
      this.flashcardService.createChart(this.chart).subscribe(
        () => this.firstReview = false
      );
    }
    else {
      if(answer ==="correct") this.chart.correct++;
      else this.chart.incorrect++;
      this.flashcardService.updateChart(this.chart).subscribe();
    }
  }

  tryAgain(){
    this.errorMessage = false;
    this.loadFlashcards();
  }
}
