import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ResultTableComponent } from './core/result-table/result-table.component';
import { AmountInputFormComponent } from './core/amount-input-form/amount-input-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    ResultTableComponent,
    AmountInputFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, //this for forms
    MatSlideToggleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
