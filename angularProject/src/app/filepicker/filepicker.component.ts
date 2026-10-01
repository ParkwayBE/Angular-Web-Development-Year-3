import { Component, EventEmitter, Output} from '@angular/core';
import { SharedEventService } from '../shared-event.service';
@Component({
  selector: 'app-filepicker',
  templateUrl: './filepicker.component.html',
  styleUrls: ['./filepicker.component.css']
})
export class FilepickerComponent {
  constructor(public sharedEvent: SharedEventService){

  }
  imageToDisplay: string = "";
  selectedFileName: string = "";
  file1: File | null = null;
  @Output() updateEventsEmitter = new EventEmitter<string>();
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
      this.updateEventsEmitter.emit(this.file1.name);
    
    }
    
  }
  displayImage(imageUrl: string) {
    // Assign the image URL to a variable in your component
    this.imageToDisplay = imageUrl;
  }

}
