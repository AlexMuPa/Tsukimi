import { Component, OnInit } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit{

  title = 'kana';

  hiraganaArray!: string[];

  hiraganaNigori!: string[];

  hiraganaDiftong!: string[];

  hiraganaSelected: string[];

  startQuiz: boolean;

  currentKana: string;

  answeredKana: number;

  correct: number;

  error: number;

  wrongAnswer: boolean;

  error_message: boolean;

  romajiConv: any;

  end: boolean;
  constructor(private sharingService: SharingService) {
    this.hiraganaSelected = ['']
    this.hiragana();
    this.startQuiz = false;
    this.currentKana = 'あ';
    this.answeredKana =0;
    this.correct=0;
    this.error=0;
    this.romajiConv = require('@koozaki/romaji-conv');
    this.wrongAnswer =false;
    this.end=false;
    this.error_message = false;
   }

   ngOnInit(): void {
    this.sharingService.setMenu({bars: false, user:false});
   }

  hiragana(): void{
    this.hiraganaArray = [
      'あ', 'い', 'う', 'え', 'お',
      'か', 'き', 'く', 'け', 'こ',
      'さ', 'し', 'す', 'せ', 'そ',
      'た', 'ち', 'つ', 'て', 'と',
      'な', 'に', 'ぬ', 'ね', 'の',
      'は', 'ひ', 'ふ', 'へ', 'ほ',
      'ま', 'み', 'む', 'め', 'も',
      'や', '',   'ゆ',   '',   'よ',
      'ら', 'り', 'る', 'れ', 'ろ',
      'わ', '',  ''  ,  '',    'を',
        '', '',   'ん', '', ''
    ]
    this.hiraganaNigori = [
      'が', 'ぎ', 'ぐ', 'げ', 'ご',
      'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
      'だ', 'ぢ', 'づ', 'で', 'ど',
      'ば', 'び', 'ぶ', 'べ', 'ぼ',
      'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
    ]

    this.hiraganaDiftong = [
      'きゃ', 'きゅ', 'きょ',
      'しゃ', 'しゅ', 'しょ',
      'ちゃ', 'ちゅ', 'ちょ',
      'にゃ', 'にゅ', 'にょ',
      'ひゃ', 'ひゅ', 'ひょ',
      'みゃ', 'みゅ', 'みょ',
      'りゃ', 'りゅ', 'りょ',
      'ぎゃ', 'ぎゅ', 'ぎょ',
      'じゃ', 'じゅ', 'じょ',
      'ぢゃ', 'ぢゅ', 'ぢょ',
      'びゃ', 'びゅ', 'びょ',
      'ぴゃ', 'ぴゅ', 'ぴょ',
    ]
  }

  katakana(): void{
    this.hiraganaArray = [
      'ア', 'イ', 'ウ', 'エ', 'オ',
      'カ', 'キ', 'ク', 'ケ', 'コ',
      'サ', 'シ', 'ス', 'セ', 'ソ',
      'タ', 'チ', 'ツ', 'テ', 'ト',
      'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
      'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
      'マ', 'ミ', 'ム', 'メ', 'モ',
      'ヤ',   ''  , 'ユ', '', 'ヨ',
      'ラ', 'リ', 'ル', 'レ', 'ロ',
      'ワ', '',  '',    '',  'ヲ',
        '',''   , 'ン',  '',   '',
  ]

    this.hiraganaNigori =[
      'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
      'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
      'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
      'バ', 'ビ', 'ブ', 'ベ', 'ボ',
      'パ', 'ピ', 'プ', 'ペ', 'ポ',
    ]

    this.hiraganaDiftong = [
      'キャ', 'キュ', 'キョ',
      'シャ', 'シュ', 'ショ',
      'チャ', 'チュ', 'チョ',
      'ニャ', 'ニュ', 'ニョ',
      'ヒャ', 'ヒュ', 'ヒョ',
      'ミャ', 'ミュ', 'ミョ',
      'リャ', 'リュ', 'リョ',
      'ギャ', 'ギュ', 'ギョ',
      'ジャ', 'ジュ', 'ジョ',
      'ヂャ', 'ヂュ', 'ヂョ',
      'ビャ', 'ビュ', 'ビョ',
      'ピャ', 'ピュ', 'ピョ',
    ]
  }

  changeKana(kana: string): void{
    if(kana) this.katakana();
    else this.hiragana();
    this.hiraganaSelected = [''];
  }

  addRemoveKana(kanaString: string): void{
    if(this.hiraganaSelected.some(kana => kana === kanaString)){
      this.hiraganaSelected = this.hiraganaSelected.filter(kana => kana !== kanaString);
    }

    else if(!this.hiraganaSelected[0]) {
      (this.hiraganaSelected as string[])[0] =kanaString;
    }

    else{
      this.hiraganaSelected.push(kanaString);
    }
  }

  addRemove(e: Event): void{
    this.addRemoveKana(((e.target as HTMLElement).textContent)?.trim() as string);
  }

  checkSelection(kanaSelected: string): boolean{
    if(this.hiraganaSelected.some(kana => kana === kanaSelected)){
       return true;
    }
    return false;
   }

   selectLine(e: Event): void{
    let kanas: string[] = [''];
    let kana = (e.target as HTMLElement).nextSibling;
    (kanas[0] as string) = (kana?.textContent?.trim() as string);
    let counter=0;
    while(kana){
      kana = kana.nextSibling;
      if(counter%2 == 0) {
        counter++;
        continue;
      }
      if(kana) kanas.push(kana?.textContent?.trim() as string);
      counter++;
    }
    for(let i=0; i<kanas.length; i++){
      this.addRemoveKana(kanas[i]);
    }
   }

   all(hiragana: string[]): void{
     for(let i=0; i<hiragana.length;i++){
      this.addRemoveKana(hiragana[i]);
     }
   }

   quiz():void{
     if(this.hiraganaSelected[0] !== ''){
       this.startQuiz = true;
       this.end = false;
       this.answeredKana =0;
       this.correct=0;
       this.error=0;
       this.hiraganaSelected = this.hiraganaSelected.filter(kana => kana !== '');
       this.randomize();
       this.currentKana = this.hiraganaSelected[0];
     }
     else{
        this.error_message = true;
     }
     setTimeout(()=>{
       this.error_message = false;
     }, 3000)
   }

   randomize(): void{
    for (let i = this.hiraganaSelected.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.hiraganaSelected[i];
      this.hiraganaSelected[i] = this.hiraganaSelected[j];
      this.hiraganaSelected[j] = temp;
    }
   }

   onEnter(value: Event): void{
     this.checkAnswer((value.target as HTMLInputElement).value);
     (value.target as HTMLInputElement).value = '';
   }

   checkAnswer(value: string): void{
    if((value != this.romajiConv.toHiragana(value) && value!=this.romajiConv.toKatakana(value)) &&(this.romajiConv.toHiragana(value) == this.currentKana || this.romajiConv.toKatakana(value) == this.currentKana)){
      this.answeredKana++;
      if(this.answeredKana === this.hiraganaSelected.length) {
        this.end = true;
        this.answeredKana--;
      }
      this.currentKana = this.hiraganaSelected[this.answeredKana];
      if(!this.wrongAnswer) this.correct++;
      this.wrongAnswer= false;
    }
    else{
      if(!this.wrongAnswer) this.error++;
      this.wrongAnswer = true;
    }
   }

   returnToSelection(): void{
     this.startQuiz=false;
     this.hiraganaSelected = [''];
     this.end = false;
   }

}
