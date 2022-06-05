import { Component, OnInit } from '@angular/core';
import { FlashcardsHomeComponent } from 'src/app/flashcards/components/flashcars/components/flashcards-home/flashcards-home.component';
import { SharingService } from 'src/app/services/sharing.service';
import { ArticleDTO } from '../../models/article.dto';
import { GrammarService } from '../../services/grammar.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  showNames: boolean;
  showAdjectives: boolean;
  showVerbs: boolean;
  showParticles: boolean;
  showOthers: boolean;
  category: boolean;
  sidebar: boolean;
  loading: boolean;
  article: ArticleDTO;
  currentArticle: string;
  error: boolean;
  constructor(private grammarService: GrammarService, private sharingService: SharingService) {
    this.showNames = false;
    this.showAdjectives = false;
    this.showVerbs = false;
    this.showParticles = false;
    this.showOthers = false;
    this.category = false;
    this.sidebar = false;
    this.loading=false;
    this.error = false;
    this.currentArticle = '';
    this.article = new ArticleDTO('', '');
  }

  ngOnInit(): void {
    this.loading = true;
    this.grammarService.getArticle('Introducción').subscribe(
      (response) => {
        this.loading = false;
        this.article = response;
      },
      (error) =>{
        this.error = true;
        this.loading = false;
        this.currentArticle = 'Introducción';
      }
    );
    this.sharingService.setMenu({bars: false, user:false});
  }

  showOptions(e: Event){
    if((e.target as HTMLElement).classList.contains('names')){
      if(this.showNames) this.showNames = false;
      else this.showNames = true;
    }
    else if((e.target as HTMLElement).classList.contains('adjectives')){
      if(this.showAdjectives) this.showAdjectives = false;
      else this.showAdjectives = true;
    }
    else if((e.target as HTMLElement).classList.contains('verbs')){
      if(this.showVerbs) this.showVerbs = false;
      else this.showVerbs = true;
    }
    else if((e.target as HTMLElement).classList.contains('particles')){
      if(this.showParticles) this.showParticles = false;
      else this.showParticles = true;
    }
    else if((e.target as HTMLElement).classList.contains('others')){
      if(this.showOthers) this.showOthers = false;
      else this.showOthers = true;
    }
  }

  openMenu(){
    this.sidebar = true;
  }
  closeMenu(){
    this.sidebar= false;
  }

  tryAgain(){
    this.error= false;
    this.loading = true;
    this.grammarService.getArticle(this.currentArticle).subscribe(
      (response) => {
        this.loading = false;
        this.article = response;
        this.sidebar =false;
      },
      (error) =>{
        this.loading = false;
        this.error = true;
      }
    )
  }

  changeArticle(e: Event){
    this.article = new ArticleDTO('', '');
    this.loading = true;
    this.error = false;
    this.grammarService.getArticle(((e.target as HTMLElement).textContent) as string).subscribe(
      (response) => {
        this.loading = false;
        this.article = response;
        this.sidebar =false;
      },
      (error) =>{
        this.error = true;
        this.loading = false;
        this.currentArticle = (e.target as HTMLElement).textContent as string;
        this.sidebar = false;
      }
    )
  }
}
