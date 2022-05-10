
export class FlashcardDTO {
  id!: string;
  front: string;
  back:string;
  answer!: string;
  consecutiveSucc!: number;
  nextReview!: string;
  userId!: string;
  days!: number;

  constructor(
    front: string,
    back: string,
  ) {
    this.front = front;
    this.back = back;
  }
}
