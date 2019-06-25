import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostService} from './service/PostService';
import {HttpClientModule} from '@angular/common/http';
import { BuscadorHashtagComponent } from './buscador-hashtag/buscador-hashtag.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorHashtagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
