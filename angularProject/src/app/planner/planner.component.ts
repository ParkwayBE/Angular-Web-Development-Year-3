import { Component } from '@angular/core';
import { MusicEvent } from '../musicevent.model';
import { EventService } from '../event.service';
import { EventsPerMonth } from '../events-per-month/events-per-month.model';
import { findIndex } from 'rxjs';
import { BackendService } from '../backend.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {
  monthList: string[] = ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  years: number[] = []
  remainingMonths: string[] = []
  currentYear = 0;
  currentPositionInYear = 0;
  currentDay = 0;
  currentDate = new Date();
  events: MusicEvent[] = [];
  sortedEvents: MusicEvent[] = [];
  eventsPerMonth: EventsPerMonth[] = [];
  musicEvent = new MusicEvent;
  eventSubscription!: Subscription;
  tempEvent = new MusicEvent;
  constructor(private eventService: EventService, private backendService: BackendService){}
  ngOnInit()
  {
    console.log(this.events);
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentPositionInYear = this.currentDate.getMonth();
    this.currentDay = this.currentDate.getDay();
    for(let i = this.currentYear; i<=this.currentYear+2;i++)
    {
      this.years.push(i);
    }
    console.log(this.years);
    for(let i = this.currentPositionInYear; i <  this.monthList.length; i++)
    {
      this.remainingMonths.push(this.monthList[i]);
    }
    this.onGetMusicEvents();
  }

  
  getMonthName(date: string): string {
    let date2 = new Date(date);
    return this.monthList[date2.getMonth()];
  }
  onGetMusicEvents(): void{
    this.eventSubscription = this.backendService.getEvents().subscribe(events => {
      console.log(events);
      
      this.events = events;
      this.events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      for(let i = 0; i<this.events.length; i++)
      {
        let dateA = new Date(this.events[i].date);
        let now = new Date();
        if(dateA < now)
        {
          this.events.splice(i, 1);
        }
      }
      console.log('sorted array');
      console.log(this.events);
      
    })
    }

  isMonthVisible(yearB: number, monthB: string): boolean {
    let date = new Date();
    let yearA = date.getFullYear();
    let monthA = date.getMonth();
    let monthB2 = this.monthList.indexOf(monthB);
    if(yearB==yearA)
    {
      if(monthB2 >= monthA)
      {
      return true;
      }
    }
    else if(yearB>yearA)
    {
      return true;
    }
    return false;
  }
  getDates(year: number, month: string): MusicEvent[] {
    const filteredDates = this.events.filter(date => {
      let date2 = new Date(date.date)
      return date2.getFullYear() === year && date2.getMonth() === this.monthList.indexOf(month);
    });
    return filteredDates;
  }
  go(id: string):void{
    this.backendService.getEvent(id)
      .subscribe(event => {
        console.log(event);
        this.tempEvent = event;
        
      })
    this.tempEvent.going = true;
    this.backendService.updateEvent(this.tempEvent, id);
  }
  
  
  nogo(id: string):void{
    this.backendService.getEvent(id)
      .subscribe(event => {
        console.log(event);
        this.tempEvent = event;
        
      })
    this.tempEvent.going = false;
    this.backendService.updateEvent(this.tempEvent, id);
  }

  getStatus(event: MusicEvent):string{
    let classing = '';
    if(event.going == false)
    {
      classing = "notgoing";
    }
    else{
      classing = "going"
    }
    return classing;
  }

}

