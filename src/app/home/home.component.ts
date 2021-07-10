import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slotTimeArray: any = []; // time array
  minutesInterval: number = 1; //minutes interval
  startTime: number = 9; // start time

  startTimeIndex: number;
  endTimeIndex: number;
  constructor() { }

  ngOnInit() {

    for (var i = 0; this.startTime < 24 * 60; i++) {
      var hours = Math.floor(this.startTime / 60);
      var minutes = this.startTime % 60;
      this.slotTimeArray[i] = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
      this.startTime = this.startTime + this.minutesInterval;
    }

    this.startTimeIndex = this.slotTimeArray.indexOf("09:00");
    this.endTimeIndex = this.slotTimeArray.indexOf("23:00");

     this.slotTimeArray.splice(0,this.startTimeIndex);
     this.slotTimeArray.splice(this.endTimeIndex);

     //this.slotEndTimeArray = this.slotTimeArray;
  }

}
