import { Injectable } from '@angular/core';
import { MusicEvent } from '../server/server.model';
@Injectable({
  providedIn: 'root',
})
export class EventsPerMonth{
    month: string;
    events: MusicEvent[];
    constructor(){
        this.month = "";
        this.events = [];
    }
    
}