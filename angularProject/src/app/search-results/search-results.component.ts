import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { MusicEvent } from '../musicevent.model';
import { SearchqueryService } from '../searchquery.service';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  eventsSearch: MusicEvent[] = [];
  events: MusicEvent[] = [];
  imageUrl: any;
  constructor(private backendService: BackendService, public eventService: EventService, private searchquery: SearchqueryService){
    this.searchquery.triggerFunction.subscribe((str: string) => {
      this.changeMusicEvent(str);
    });

  }
  
  ngOnInit()
  {
    this.onGetMusicEvents();
    
    console.log(this.events);
    
  }
  onGetMusicEvents(): void{
    this.backendService.getEvents().subscribe(events =>{

        this.events = events;
        this.eventsSearch = events;
        this.getImageUrl();
        this.events.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        
        
      
    }); 
    
  }

  changeMusicEvent(str: string): void{
    this.eventsSearch = []
    console.log(str);
    for (let i = 0; i < this.events.length; i++) {
      if(this.events[i]["name"].includes(str))
      {
        this.eventsSearch.push(this.events[i]);
        
      }
    }
    
  }
  async getImageUrl() {
    try {
      
      for (const e of this.events) {
        
      
      this.imageUrl = await this.backendService.getImg(e.id, e.imageData)
      e.imageData = this.imageUrl;
      console.log(e.imageData);
      }

    } catch (error) {
      console.error('Error getting download URL:', error);
      this.imageUrl = null; 
    }
  }
}
