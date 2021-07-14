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
  idField = 1;
  //slotEndTimeArray: any = [];
  slot:any = [];

  selectedOptionIndex;
  selectedStartTime;
  selectedEndTime;
  enableAddButton: boolean;

  valueChange: any;

  slotArray = [];
  currentDay: string;
  displayData = [];
  enableAppointments: boolean;
  enableAddBetweenAppt: boolean;

  index: any;
  removeElementCnt: number = 0;
  removedIndexValue: any = [];

  constructor( private fb: FormBuilder, private service: CommonServiceService) { }
  
  ngOnInit() {
    this.enableAppointments = false;
    this.enableAddBetweenAppt = false;
    this.service.day$.subscribe((data)=>{
      this.currentDay = data;
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
    
    //this.slotEndTimeArray = this.slotTimeArray;

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

    //this.slotArray.splice(i,1);      //It will allow to set the select/change value of last slot
    
    this.slotArray.push({start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd]});

    //this.slotArray.splice(i,0,{start: this.selectedStartTime, end: this.slotTimeArray[indexAfterAdd]});       //It will allow to set the select/change value of last slot
    this.getFormArray.patchValue(this.slotArray);
    
    console.log(this.slotArray);
    
    console.log("ahlfhas:",this.getFormArray);
 
    this.enableAddButton = true;
  }

  addItem(i){
    
    // let formObject = this.form.value;
    // let formObjectIndex ;

    let indexOfStartTimeAfterAdd: number;         //storing selected start time index.

    //let indexAfterAdd;

    this.slot = <FormArray>this.form.controls["controlsArray"];
    
    this.slot.push(this.getFormGroup(),this.form.get('controlsArray')['id'] = this.idField);
    console.log(this.selectedStartTime);

    // if(this.removeElementCnt > 1){
    //   console.log();
      
    //   this.selectedStartTime = this.slotTimeArray[this.slotTimeArray.indexOf(this.slotArray[this.slotArray.length - 1].start) + 45];
    //   console.log(this.selectedStartTime);
      
    // }else{
      this.selectedStartTime = this.slotTimeArray[this.slotTimeArray.indexOf(this.selectedStartTime) + 45]; //Setting start time.
    //}
    
    console.log(this.selectedStartTime);
    
    //this.slot.patchValue({ start: this.slotTimeArray[indexOfStartTimeAfterAdd], end: this.slotTimeArray[indexOfStartTimeAfterAdd + 30] });
    
    indexOfStartTimeAfterAdd = this.slotTimeArray.indexOf(this.selectedStartTime); //storing selected start time index.
    console.log(indexOfStartTimeAfterAdd);
    console.log(this.slotTimeArray[indexOfStartTimeAfterAdd]);

    //pushing into array and then patching it to control:---
    this.idField +=1;
    this.slotArray.push({ start: this.slotTimeArray[indexOfStartTimeAfterAdd], end: this.slotTimeArray[indexOfStartTimeAfterAdd+30] });
    setTimeout(() => {
      this.getFormArray.setValue(this.slotArray);
    }, 200);
    console.log("Form Array Value:---",this.form.get('controlsArray'));
    

    //console.log(this.getFormArray.at(i+1), "index",i);
    console.log(this.slotArray);
    console.log("Form:",this.form);
     
  }
  
  removeItem(index){

    let removdControlIndex;
    let indexNextStart: number;
    let indexNextEnd: number;
    console.log(this.slot[index]);

    this.index = index;
    this.slot.removeAt(index);       // Removes control from array.
    this.removedIndexValue.push(index);
    this.slotArray.splice(index, 1); // Remove value of that control from arrary.
    console.log("Removed Index Array:--",this.removedIndexValue);
      
    //this.removeElementCnt += 1;
    console.log("Counter of removed element:-",this.removeElementCnt);

    indexNextStart = this.slotTimeArray.indexOf(this.slotArray[this.index].start); //Gives index of next slot/record's start time.
    console.log("Next Data Start Index:--",indexNextStart);
    

    indexNextEnd = this.slotTimeArray.indexOf(this.slotArray[this.index].end);   //Gives index of next slot/record's end time.
    console.log("Next Data Start Index:--",indexNextEnd);

    console.log("All Values:--",this.slotTimeArray[indexNextStart],this.slotTimeArray[indexNextEnd]);
    //if(this.index < this.slotArray.length){
      this.enableAddBetweenAppt = true;
    //}
    
  }

  addItemBetween(ind){

    console.log(ind);
    
    let indexPrevStart: number;
    let indexPrevEnd: number;
    let indexNextStart: number;
    let indexNextEnd: number;

    //ind = this.index;
    console.log(this.index);

    indexPrevStart = this.slotTimeArray.indexOf(this.slotArray[this.index -1].start);  //Gives index of previous slot/record's end time.
    
    indexPrevEnd = this.slotTimeArray.indexOf(this.slotArray[this.index - 1].end);  //Gives index of previous slot/record's end time.
    console.log("Prev Data End Index:--",indexPrevEnd);

    indexNextStart = this.slotTimeArray.indexOf(this.slotArray[this.index].start); //Gives index of next slot/record's start time.
    console.log("Next Data Start Index:--",indexNextStart);

    indexNextEnd = this.slotTimeArray.indexOf(this.slotArray[this.index].end);   //Gives index of next slot/record's end time.

    console.log("All Values:--",this.slotTimeArray[indexPrevEnd],this.slotTimeArray[indexNextStart],this.slotTimeArray[indexNextEnd]);
    
    
    console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextStart]));
    console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextEnd]));

      this.slot.insert(ind,this.getFormGroup());
      if((indexNextStart - indexPrevEnd) >= 60){
        
        console.log("Start:--",this.slotTimeArray[this.slotTimeArray.indexOf(indexNextStart)]);
        
        //this.slotArray[this.index] = { start: this.slotTimeArray[indexNextStart - 45], end: this.slotTimeArray[indexNextStart - 15] };
        console.log(ind,this.index);
        
        this.slotArray.splice(this.index ,0,{ start: this.slotTimeArray[indexNextStart - 45], end: this.slotTimeArray[indexNextStart - 15] });
        
        console.log(this.slotArray);
        
        setTimeout(() => {
          this.getFormArray.setValue(this.slotArray);
        }, 200);

        
        console.log(this.slotArray[this.index]);
        console.log(this.index);
        
        if((indexNextStart - indexPrevEnd) == 60){
          this.enableAddBetweenAppt = false;
          
        }
        
      }
      console.log(ind);
      
      this.removedIndexValue.splice(ind, 1);
      console.log(this.removedIndexValue);
      console.log(this.index);
    //this.index += 1;
    console.log(this.slotArray[this.slotArray.length - 1]);
    
  }

  download(){
    this.currentDay;
    this.enableAppointments = true;
    //this.displayData.push( this.slot );
  }
  
}

























































// addItemBetween(){
//   // let prevIndexEndData;
//   // let nextIndexStartData;

//   let indexPrevStart: number;
//   let indexPrevEnd: number;
//   let indexNextStart: number;
//   let indexNextEnd: number;

//   //this.slot.insert(this.index,this.getFormGroup());
//   // prevIndexEndData = this.slotArray[this.index - 1].end;
//   // nextIndexStartData = this.slotArray[this.index + 1].start;
//   console.log(this.index);

//   indexPrevStart = this.slotTimeArray.indexOf(this.slotArray[this.index -1].start);  //Gives index of previous slot/record's end time.
  
//   indexPrevEnd = this.slotTimeArray.indexOf(this.slotArray[this.index - 1].end);  //Gives index of previous slot/record's end time.
//   console.log("Prev Data End Index:--",indexPrevEnd);

//   indexNextStart = this.slotTimeArray.indexOf(this.slotArray[this.index].start); //Gives index of next slot/record's start time.
//   console.log("Next Data Start Index:--",indexNextStart);

//   indexNextEnd = this.slotTimeArray.indexOf(this.slotArray[this.index].end);   //Gives index of next slot/record's end time.

//   console.log("All Values:--",this.slotTimeArray[indexPrevEnd],this.slotTimeArray[indexNextStart],this.slotTimeArray[indexNextEnd]);
  
  
//   console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextStart]));
//   console.log(this.slotTimeArray.indexOf(this.slotTimeArray[indexNextEnd]));
  
//   //if(this.removeElementCnt == 1){

//     this.slot.insert(this.index,this.getFormGroup());
//     if((indexNextStart - indexPrevEnd) >= 60){
//       //this.slot.insert(this.index,this.getFormGroup());
      
//       console.log("Start:--",this.slotTimeArray[this.slotTimeArray.indexOf(indexNextStart)]);
//       //console.log("End:--",this.slotTimeArray[this.slotTimeArray.indexOf(indexNext)]);
      
//       this.slotArray.splice(this.index,0,{ start: this.slotTimeArray[indexNextStart - 45], end: this.slotTimeArray[indexNextStart - 15] });
      
//       console.log(this.slotArray);
      
//       setTimeout(() => {
//         this.getFormArray.setValue(this.slotArray);
//       }, 200);
//       console.log(this.slotArray[this.index]);
//       console.log(this.index);
//       this.removeElementCnt = 0;
      
//       if((indexNextStart - indexPrevEnd) == 60){
//         this.enableAddBetweenAppt = false;
        
//       }
      
//     }
//   //}
//   // else{
//   //   if((indexNextStart - indexPrevEnd) >= 60){

//   //     this.slot.insert(this.index,this.getFormGroup());
//   //     console.log("index",this.index,this.selectedStartTime);
//   //     // this.slotArray.splice(this.index,0,{ start: this.slotTimeArray[indexNextStart - 45], end: this.slotTimeArray[indexNextStart - 15] });
//   //     // setTimeout(() => {
//   //     //   this.getFormArray.setValue(this.slotArray);
//   //     // }, 200);
//   //   }else{
//   //     setTimeout(() => {
//   //       this.enableAddBetweenAppt = false;
//   //     }, 200);
//   //   }
//   //   //this.removeElementCnt -= 1;
//   // }
//   this.removeElementCnt = 0;
//   //this.index += 1;
//   console.log(this.slotArray[this.slotArray.length - 1]);
  
// }







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