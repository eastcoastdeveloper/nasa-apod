import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/date-picker/date-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { WindowRef } from './windowRef';
import { NasaHeaderComponent } from './components/header/header.component';
import { NasaSearchComponent } from './components/seachbar/search.component';
import { NasaPhotoBodyComponent } from './components/photo-body/photo-body.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NasaPhotoBodyComponent,
    NasaHeaderComponent,
    NasaSearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [WindowRef],
  bootstrap: [AppComponent],
})
export class AppModule {}
