import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfPinsComponent } from './components/list-of-pins/list-of-pins.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { ToasterCommonComponent } from './components/toaster-common/toaster-common.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfPinsComponent,
    NotFoundComponent,
    ToasterCommonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
