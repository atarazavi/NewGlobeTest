import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SchoolsModule } from './features/schools/schools.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialDesignModule } from './shared/materialdesign/materialdesign.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MaterialDesignModule,
    SchoolsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
