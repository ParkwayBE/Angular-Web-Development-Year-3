import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Observable, Subscription } from 'rxjs';
import { EventService } from '../event.service';
import { SharedEventService } from '../shared-event.service';
import { MusicEvent } from '../musicevent.model';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy{
  @Input() musicEvent = {};
  events: MusicEvent[] = [];
  imageUrl!: any;

  eventSubscription!: Subscription;
  constructor(private backendService: BackendService, private appComponent: AppComponent, public eventService: EventService, public sharedEvent: SharedEventService){
    this.sharedEvent.triggerFunction.subscribe(() => {
    this.onAddEvent();
  });
    this.sharedEvent.triggerFunction2.subscribe(() =>{
      this.onGetMusicEvents();
    
    });
  }
  ngOnInit()
  {
    this.onGetMusicEvents();
    
    console.log(this.events);
    
  }
  onGetMusicEvents(): void{
    this.eventSubscription = this.backendService.getEvents().subscribe(events => {
      console.log(events);
      
      this.events = events;
      this.getImageUrl();
      
    }); 

  }
  async getImageUrl() {
    try {
      
      for (const e of this.events) {
        
      
      this.imageUrl = await this.backendService.getImg(e.id, e.imageData)
      e.imageData = this.imageUrl;
      }

    } catch (error) {
      console.error('Error getting download URL:', error);
      this.imageUrl = null; 
    }
  }


  ngOnDestroy(): void {
    if(this.eventSubscription){
      this.eventSubscription.unsubscribe()
    }
  }

  onAddEvent(): void{
    const newEvent = {
    id: "",
    name: this.sharedEvent.sharedEvent.name,
    imageData: this.sharedEvent.sharedEvent.file.name,
    date: this.sharedEvent.sharedEvent.date,
    location: this.sharedEvent.sharedEvent.location,
    description: this.sharedEvent.sharedEvent.description,
    going: false
    }


    console.log('test');
    console.log(this.sharedEvent.sharedEvent.name);
    // this.eventService.addEvent(newEvent).subscribe({
    //   next: (response) => {
    //     console.log('server added: ', response);
    //     this.onGetMusicEvents();
        
    //   },
    //   error: (error) => console.log('error: ', error)
    // });
    this.backendService.createEvent(newEvent, this.sharedEvent.sharedEvent.file);
    
  }
  
}
