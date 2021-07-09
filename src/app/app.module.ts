import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DaysComponent } from './days/days.component';
import { AppointmentSlotsComponent } from './appointment-slots/appointment-slots.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DaysComponent,
    AppointmentSlotsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
