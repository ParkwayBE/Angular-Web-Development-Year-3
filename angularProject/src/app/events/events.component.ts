import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchqueryService } from '../searchquery.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  inputText = "";
  currentEvent = {};
  @Output() updateEventsEmitter = new EventEmitter<object>();
  constructor(private router: Router, private searchquery: SearchqueryService){

  }
  updateEvents(obj: object):void{
    this.currentEvent = obj;
    
  }
  changeRouteToAdd():void{
    
    this.router.navigate(['events/add']);
  }
  changeRouteToSearch():void{
    
    this.router.navigate(['events/search']);
    this.searchquery.triggerFunction.emit(this.inputText);
  }
}
