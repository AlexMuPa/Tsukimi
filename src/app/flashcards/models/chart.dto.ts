export class ChartDTO {
  id!: string;
  correct: number;
  incorrect: number;
  userId!: string;
  days!: string;

  constructor(
    correct: number,
    incorrect: number,
  ) {
    this.correct = correct;
    this.incorrect = incorrect;
  }
}
