import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appointment-slots',
  templateUrl: './appointment-slots.component.html',
  styleUrls: ['./appointment-slots.component.css']
})
export class AppointmentSlotsComponent implements OnInit {

  form: FormGroup;
  @Input() slotTimeArray: any = []; // time array
  slotEndTimeArray: any = [];
  slot:any = [];
  idField = 1;

  selectedOptionIndex;
  selectedStartTime;
  selectedEndTime;

  valueChange: any;

  constructor( private fb: FormBuilder) { }

  
  ngOnInit() {
    this.form = this.fb.group({
      controlsArray: this.fb.array([this.getFormGroup()]),
      // controlsArray: this.fb.array([
      //   this.fb.group({
      //     start: [''],
      //     end: ['']
      //   })
      // ])
    });

    this.valueChange = this.form.valueChanges.subscribe(val=>{
      console.log(val);
        
    });
    console.log("Changed Value:-",this.valueChange);
    
    this.slotEndTimeArray = this.slotTimeArray;
  }

  private getFormGroup() {
    return this.fb.group({
      start: [""],
      end: [""],
    });
  }

  addItem(){
    let formObject = this.form.value;
    formObject.id = this.idField;

    this.slot = <FormArray>this.form.controls["controlsArray"];
    this.slot.push(this.getFormGroup());
    console.log("Slot Array:--",this.slot);

  }
  removeItem(){}

  onSelectTime($event){
    let indexAfterAdd;

    this.selectedStartTime = $event.target.value;
    console.log("Selected Start Time:-",this.selectedStartTime);

    indexAfterAdd = this.slotTimeArray.indexOf(this.selectedStartTime) + 30;
    
    this.selectedEndTime = this.slotTimeArray[indexAfterAdd];
      
    
  }
}
