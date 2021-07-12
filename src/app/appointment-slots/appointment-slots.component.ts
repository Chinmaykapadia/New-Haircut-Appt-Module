import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';
@Component({
  selector: 'app-appointment-slots',
  templateUrl: './appointment-slots.component.html',
  styleUrls: ['./appointment-slots.component.css']
})
export class AppointmentSlotsComponent implements OnInit {

  form: FormGroup;
  @Input() slotTimeArray: any = []; // time array
  @Input() day;
  //slotTimeArray;
  slotEndTimeArray: any = [];
  slot:any = [];
  idField = 1;

  selectedOptionIndex;
  selectedStartTime;
  selectedEndTime;
  enableAddButton: boolean;

  valueChange: any;

  slotArray = [];

  constructor( private fb: FormBuilder, private service: CommonServiceService) { }
  
  ngOnInit() {

    this.service.day$.subscribe((data)=>{
      //let clearFormArray = <FormArray>this.form.controls["controlsArray"];
      //clearFormArray.clear();
      console.log(data.day);
      
    });

    this.enableAddButton = false;
    this.form = this.fb.group({
      controlsArray: this.fb.array([this.getFormGroup()]),
    });   
       // this.slotTimeArray = this.service.slotTimeArray;
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

  public get getFormArray(): FormArray{
    return this.form.get('controlsArray') as FormArray;
  }

  onSelectTime($event, i: number){

    let indexAfterAdd;
    //let controlsIndex;

    this.selectedStartTime = $event.target.value;
    console.log("Selected Start Time:-",this.selectedStartTime);

    // controlsIndex = this.getFormArray.at(i).get('start');
    // console.log("Controls Index:",controlsIndex);
    
    indexAfterAdd = this.slotTimeArray.indexOf(this.selectedStartTime) + 30;
    console.log(indexAfterAdd);
    
    //this.selectedEndTime = this.slotTimeArray[indexAfterAdd];
    this.slotArray.push({start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd]})
    this.getFormArray.patchValue(this.slotArray);

    this.enableAddButton = true;
  }

  addItem(i){
    
    // let formObject = this.form.value;
    // let formObjectIndex ;

    let indexOfStartTimeAfterAdd;

    //let indexAfterAdd;

    this.slot = <FormArray>this.form.controls["controlsArray"];
    this.slot.push(this.getFormGroup());
    console.log(this.selectedStartTime);
    
    this.selectedStartTime = this.slotTimeArray[this.slotTimeArray.indexOf(this.selectedStartTime) + 45]; //Setting start time.
    console.log(this.selectedStartTime);
    
    //this.slot.patchValue({ start: this.slotTimeArray[indexOfStartTimeAfterAdd], end: this.slotTimeArray[indexOfStartTimeAfterAdd + 30] });
    
    indexOfStartTimeAfterAdd = this.slotTimeArray.indexOf(this.selectedStartTime); //storing selected start time index.
    console.log(indexOfStartTimeAfterAdd);
    console.log(this.slotTimeArray[indexOfStartTimeAfterAdd]);

    //pushing into array and then patching it to control:---
    this.slotArray.push({ start: this.slotTimeArray[indexOfStartTimeAfterAdd], end: this.slotTimeArray[indexOfStartTimeAfterAdd+30] });
    setTimeout(() => {
      this.getFormArray.setValue(this.slotArray);
    }, 100);
    console.log("Form Array Value:---",this.form.get('controlsArray'));
    

    //console.log(this.getFormArray.at(i+1), "index",i);
    console.log(this.slotArray);
    console.log("Form:",this.form);
     
  }
  
  removeItem(index: number){
    const control = <FormArray>this.form.controls["controlsArray"];
    control.removeAt(index);
    console.log(control);
  }
  
}






















//this.selectedEndTime = this.getFormArray.at(i).patchValue({ end: this.slotTimeArray[indexAfterAdd] });

// onChangeEndTime($event, i: number){
  //   this.selectedStartTime = $event.target.value;
  //   let indexOfStartTimeAfterAdd;
  //   indexOfStartTimeAfterAdd = this.slotTimeArray.indexOf(this.selectedStartTime) + 45;
  //   this.getFormArray.at(i+1).patchValue({ start: this.slotTimeArray[indexOfStartTimeAfterAdd] });
  // }







  // this.form = this.fb.group({
  //   controlsArray: this.fb.array([this.getFormGroup()]),
  //   // controlsArray: this.fb.array([
  //     //   this.fb.group({
  //       //     start: [''],
  //       //     end: ['']
  //       //   })
  //       // ])
  //     });
      
  //    
  // });