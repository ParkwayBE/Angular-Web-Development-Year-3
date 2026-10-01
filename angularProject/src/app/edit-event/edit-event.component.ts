import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Observable, from } from 'rxjs';
import { Router, ParamMap, ActivatedRoute, CanDeactivateFn } from '@angular/router';
import { MusicEvent } from '../musicevent.model';
import { SharedEventService } from '../shared-event.service';
import { BackendService } from '../backend.service';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { promises } from 'dns';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements CanComponentDeactivate{
  saved: boolean = false;
  event: MusicEvent = new MusicEvent;
  event2: MusicEvent = new MusicEvent;
  id: string = "";
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute, private backendService: BackendService){}
  ngOnInit():void{
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.backendService.getEvent(this.id)
      .subscribe(event => {
        console.log(event);
        this.event = event;
        this.id = this.event.id;
        
      })
    })
    
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if(this.saved === false){
      return confirm('do you want to discard changes?');
    }
    else{
      return true;
    }
  }

  // onLoadEvent(id: number){
  //   this.eventService.getevent(id).subscribe({
  //     next: (response: MusicEvent) => {
  //       console.log('server loaded: ', response);
  //       this.event = response;
  //       this.eventID = this.event.id;
  //       this.eventName = this.event.name;
  //       this.eventDate = this.event.date;
  //       this.eventLocation = this.event.location;
  //       this.eventDescription = this.event.description;
  //       this.eventImageData = this.event.imageData;
  //     },
  //     error: (error) => console.log('error: ', error)
  //   });
  // }
  // editEvent():void{
  //   this.event.name = this.eventName
  //   this.event.date = this.eventDate 
  //   this.event.location = this.eventLocation
  //   this.event.description = this.eventDescription
  //   this.event.imageData = this.eventImageData
  //   this.eventService.updateEvent(this.event).subscribe(
  //     (response: MusicEvent) => {
  //       console.log('Event updated: ', response);
  //       this.router.navigate(['events/details', this.event.id]);

  //     }
  //   )
  // }
  editEvent():void{
    this.backendService.updateEvent(this.event, this.id)
    this.router.navigate(['events/details', this.event.id]);
  }

  onImageSelected(event: any){
    const file: File = event.target.files[0];
    if (file) {
    this.event.imageData= file.name;
    this.backendService.uploadImg('events/'+this.id+'/'+file.name, file);
    this.event.imageData = file.name;

  }
}
}

