import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { KanaModule } from './kana/kana.module';
import { UserModule } from './users/user.module';
import { SharingService } from './services/sharing.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { GrammarModule } from './grammar/grammar.module';
import { NgxFitTextModule } from '@pikselin/ngx-fittext';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    KanaModule,
    UserModule,
    FlashcardsModule,
    GrammarModule,
    NgxFitTextModule
  ],
  providers: [SharingService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {provide : LocationStrategy , useClass: HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
