import { Component, EventEmitter, Output} from '@angular/core';
import { EventService } from '../event.service';
import { SharedEventService } from '../shared-event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  @Output() addEventEmitter = new EventEmitter<object>();
  
  eventName: string;
  eventDate: string;
  eventImageData: string;
  eventLocation: string;
  eventDescription: string;
  imageToDisplay: string = "";
  selectedFileName: string = "";
  file1: File | null = null;
  constructor(public eventService: EventService, private sharedEvent: SharedEventService, private router: Router){
    this.eventName = "";
    this.eventImageData = "";
    this.eventDate = "";
    this.eventLocation = "";
    this.eventDescription = "";
  }
  addEvent():void{
    const objEvent = {
      name: this.eventName,
      imageData: this.selectedFileName,
      date: this.eventDate,
      location: this.eventLocation,
      description: this.eventDescription,
      file: this.file1
    };
    this.sharedEvent.sharedEvent = objEvent;
    this.sharedEvent.triggerFunction.emit();
    this.router.navigate(['events'])
  }
  
  
  onImageSelected(event: any) {
    
    // const file: File = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const base64Image = reader.result as string;
    //   this.imagePathEmitter.emit(base64Image);
    //   this.base = base64Image;
    //   //console.log(this.base);
    // };
    // reader.readAsDataURL(file);
    // const file: File = event.target.files[0];
    // if (file) {
    // this.selectedFileName = file.name;
    // console.log('filename');
    // console.log(this.selectedFileName);
    // this.updateEventsEmitter.emit(this.selectedFileName);
    // const reader = new FileReader();

    // // Set up the FileReader onload event
    // reader.onload = (e: any) => {
    //   // Get the image URL from the FileReader result
    //   const imageUrl = e.target.result;
    //   // Display the image
    //   this.displayImage(imageUrl);
    // };

    // // Read the selected file as a data URL
    // reader.readAsDataURL(file);
    // }
    const target = event.target as HTMLInputElement;

    if(target.files && target.files[0])
    {

      this.file1 = target.files[0];
      console.log(this.file1.name);
      
    
    }
    
  }
  displayImage(imageUrl: string) {
    // Assign the image URL to a variable in your component
    this.imageToDisplay = imageUrl;
  }

}
