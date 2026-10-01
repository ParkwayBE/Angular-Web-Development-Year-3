import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicEvent } from './server/server.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private musicEvent: MusicEvent) {}

    getevents(): Observable<MusicEvent[]>{
      const url = 'http://localhost:3000/events';
      return this.http.get<MusicEvent[]>(url);
    }
    getevent(id: number): Observable<MusicEvent>{
      const url = 'http://localhost:3000/events/' + id;
      return this.http.get<MusicEvent>(url);
    }
    addEvent(event: MusicEvent): Observable<MusicEvent>{
      const url = 'http://localhost:3000/events'
      return this.http.post<MusicEvent>(url, event);
    }
    updateEvent(event: MusicEvent): Observable<MusicEvent>{
      const url = "http://localhost:3000/events/" + event.id;
      return this.http.put<MusicEvent>(url, event);
    }
    deleteServer(id: number): Observable<any>{
      const url = "http://localhost:3000/events/" + id;
      return this.http.delete(url);
    }
    changeAttendence(newStatus: {going: boolean}, id: number): Observable<MusicEvent>{
      const url = "http://localhost:3000/events/" + id;
      return this.http.patch<MusicEvent>(url, newStatus);
    }
  
}
