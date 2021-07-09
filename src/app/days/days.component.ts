import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
 
@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {

  days = [];
  activeDaySelection: number;
  constructor(private service: CommonServiceService) { }

  ngOnInit() {
    this.days = this.service.days;
  }
  
  daysListClick(index: number){
    this.activeDaySelection = index;
  }
}
