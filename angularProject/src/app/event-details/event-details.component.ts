import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { EventService } from '../event.service';
import { MusicEvent } from '../musicevent.model';
import { SharedEventService } from '../shared-event.service';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent{
  musicEvent: MusicEvent = new MusicEvent; 
  id: string = "";
  imageUrl!: any;
  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router, private sharedEvent: SharedEventService, private backendService: BackendService){}
  ngOnInit():void{
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.backendService.getEvent(this.id)
      .subscribe(event => {
        console.log(event);
        this.musicEvent = event;
        this.getImageUrl()
      })
      
    })
    

  }
  async getImageUrl() {
    try {
      
      
        
      
      this.imageUrl = await this.backendService.getImg(this.musicEvent.id,this.musicEvent.imageData)
      this.musicEvent.imageData = this.imageUrl;
      

    } catch (error) {
      console.error('Error getting download URL:', error);
      this.imageUrl = null; 
    }
  }
 

  // onLoadEvent(id: number){
  //   this.eventService.getevent(id).subscribe({
  //     next: (response: MusicEvent) => {
  //       console.log('server loaded: ', response);
  //       this.musicEvent = response;
        
  //     },
  //     error: (error) => console.log('error: ', error)
  //   });
  // }
  deleteEventClick():void{
    this.route.paramMap.subscribe((params) =>{
      const idAsString = params.get('id');
      if (idAsString !== null) {
      this.backendService.deleteEvent(idAsString);
      this.router.navigate(['events'])
      console.log();
      }
    }
    );
  }

  // deleteEvent(id: number):void{
  //   this.eventService.deleteServer(id).subscribe(
  //     (response: any) => {
  //       console.log('deleted: ', response);
  //       this.sharedEvent.triggerFunction2.emit();
  //       this.router.navigate(['events'])
  //     }
  //   )
  // }
}
