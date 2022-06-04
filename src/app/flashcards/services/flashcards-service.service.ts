import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap }  from  'rxjs/operators';
import { ChartDTO } from '../models/chart.dto';
import { FlashcardDTO } from '../models/flashcard.dto';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsServiceService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://rocky-waters-38120.herokuapp.com/api/';
    //this.url = 'http://localhost/tfm/public/api/'
  }

  getFlashcards(user_id: string): Observable<FlashcardDTO[]> {
     return this.http.get<FlashcardDTO[]>(this.url +'get/' + user_id).pipe(
       map( flashcards => flashcards.filter(flashcard => new Date(flashcard.nextReview.replace(/:| /g,"-")) < new Date()))
     );
  }

  getAllFlashcards(user_id: string): Observable<FlashcardDTO[]> {
    return this.http.get<FlashcardDTO[]>(this.url + 'get/' + user_id);
  }

  getFlashcard(id: string): Observable<FlashcardDTO> {
    return this.http.get<FlashcardDTO>(this.url+'flashcard/' + id);
  }

  createFlashcard(flashcard: FlashcardDTO): Observable<FlashcardDTO[]> {
    return this.http.post<FlashcardDTO[]>(this.url + 'create', flashcard);
  }
  //es srs
  spacedRepetition(flashcard: FlashcardDTO): Observable<any> {
    return this.http.put<any>(this.url + 'srs', flashcard);
  }
  updateFlashcard(flashcard: FlashcardDTO): Observable<any> {
    return this.http.put<any>(this.url + 'update', flashcard);
  }

  deleteFlashcard(id: string): Observable<any> {
    return this.http.delete<any>(this.url + 'delete/'+ id);
  }

  getData(user_id: string): Observable<ChartDTO[]> {
    return this.http.get<ChartDTO[]>(this.url + 'get/chart/' + user_id);
  }

  updateChart(chart: ChartDTO): Observable<any> {
    return this.http.put<any>(this.url+'update/chart', chart);
  }

  createChart(chart: ChartDTO): Observable<ChartDTO[]> {
    return this.http.post<ChartDTO[]>(this.url + 'create/chart', chart);
  }
}
