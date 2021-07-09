import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appointment-slots',
  templateUrl: './appointment-slots.component.html',
  styleUrls: ['./appointment-slots.component.css']
})
export class AppointmentSlotsComponent implements OnInit {

  form: FormGroup;
  slotTimeArray: any = []; // time array
  minutesInterval: number = 1; //minutes interval
  startTime: number = 9; // start time

  startTimeIndex: number;
  endTimeIndex: number;

  slot:any = [];
  idField = 1;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      start: [''],
      end: ['']
    });

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
    // console.log("Before:-",removeBeforeStartTime);
    // console.log("After:-",removeAfterEndTime);
    
  
    
  }
  addItem(){
    let formObject = this.form.value;
    formObject.id = this.idField;

    this.slot = <FormGroup>this.form.controls["form"];
    this.slot.push(this.form);
    console.log(formObject);
    
  }
  removeItem(){}
}
