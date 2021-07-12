import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
 
@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  @Output() day = new EventEmitter();
  days = [];
  activeDaySelection: number;
  constructor(private service: CommonServiceService) { }

  ngOnInit() {
    this.days = this.service.days;
    
  }
  
  daysListClick(index: number){

    let emitData = { day: this.days[index]}
    this.activeDaySelection = index;
    this.day.emit(emitData);
    this.service.sendSelectedDay(emitData);
  }
}
