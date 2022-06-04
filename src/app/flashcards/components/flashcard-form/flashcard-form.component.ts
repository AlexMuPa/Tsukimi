import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { SharingService } from 'src/app/services/sharing.service';
import { FlashcardDTO } from '../../models/flashcard.dto';
import { FlashcardsServiceService } from '../../services/flashcards-service.service';

@Component({
  selector: 'app-flashcard-form',
  templateUrl: './flashcard-form.component.html',
  styleUrls: ['./flashcard-form.component.css']
})
export class FlashcardFormComponent implements OnInit {

  flashcard: FlashcardDTO;

  front: FormControl;
  back: FormControl;
  flashcardForm: FormGroup;
  isValidForm: boolean | null;
  fliping: boolean | null;
  errorMessage: boolean | null;
  @Input() edit:any = '';

  constructor(
    private formBuilder: FormBuilder,
    private flashcardService: FlashcardsServiceService,
    private sharingService: SharingService
    ) {
    this.flashcard = new FlashcardDTO('', '');
    this.isValidForm = null;
    this.fliping = null;
    this.errorMessage = null;
    this.front = new FormControl(this.flashcard.front, [
      Validators.required,
      Validators.maxLength(5000)
    ]);
    this.back = new FormControl(this.flashcard.back, [
      Validators.required,
      Validators.maxLength(5000)
    ]);


    this.flashcardForm = this.formBuilder.group({
      front: this.front,
      back: this.back,
    });
   }

  ngOnInit(): void {
    console.log(this.edit)
    if(this.edit){
      this.flashcardService.getFlashcard(this.edit).subscribe(
        (response) => {
          console.log(response);
          this.front.setValue(response.front);
          this.back.setValue(response.back);
        }
        );
      }
  }

  createFlashcard(): void{
    if (this.flashcardForm.invalid || this.fliping) {
      this.isValidForm = false;
      this.fliping = null;
      return;
    }

    this.flashcard.front = this.flashcardForm.value.front;
    this.flashcard.back = this.flashcardForm.value.back;

    if(this.edit) {
      this.flashcard.id = this.edit;
      this.flashcardService.updateFlashcard(this.flashcard).subscribe(
        response => {
          console.log(response);
          this.sharingService.setModal({isActive: false});
        },
        error => {
          console.log(error.error.message);
          this.errorMessage = true;
        }
      )}
    else {
      this.flashcard.nextReview = new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.flashcard.consecutiveSucc = 0;
      this.flashcard.days = 0;
      this.flashcard.userId = sessionStorage.getItem('userId') as string;
      this.flashcard.answer = 'error';
      this.flashcardService.createFlashcard(this.flashcard).subscribe(
      response => {
        console.log(response);
        this.sharingService.setModal({isActive: false});
      },
      error => {
        console.log(error.error.message);
        this.errorMessage = true;
      }
    )
  }
  }

  closeModal(){
    this.sharingService.setModal({isActive: false});
  }

  flip(){
    this.fliping = true;
    let frontPart = this.front.value;
    this.front.setValue(this.back.value);
    this.back.setValue(frontPart);
  }

  tryAgain(){
    this.errorMessage = null;
  }

}
