import { Component } from '@angular/core';
import { MusicEvent } from './server/server.model';
import { EventService } from './event.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularProject';
  events: MusicEvent[] = [];
  constructor(public eventService: EventService){
  }
  get theArray(){
    return this.events;
  }
  ngOnInit():void{
    
  }

}
