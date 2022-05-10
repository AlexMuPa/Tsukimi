import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDTO } from '../models/article.dto';

@Injectable({
  providedIn: 'root'
})
export class GrammarService {

  url: string = 'https://rocky-waters-38120.herokuapp.com/api/';
  constructor(private http: HttpClient) { }
  // 'http://localhost/tfm/public/api/article/'
  getArticle(title: string): Observable<ArticleDTO> {
    return this.http.get<ArticleDTO>(this.url + 'article/' + title);
  }
}
