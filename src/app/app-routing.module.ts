import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { DaysComponent } from '../app/days/days.component';
import { AppointmentSlotsComponent } from '../app/appointment-slots/appointment-slots.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, 
    children:
    [
      { path: 'days', component: DaysComponent },
      { path: 'appointment-slots', component: AppointmentSlotsComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
