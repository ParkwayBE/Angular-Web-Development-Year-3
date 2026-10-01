import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicEvent{
    id: string;
    name: string;
    imageData: string;
    date: string;
    location: string;
    description: string;
    going: boolean;
    constructor(){
        this.id = "";
        this.name = "";
        this.imageData = "";
        this.date = "";
        this.location  = "";
        this.description = "";
        this.going = false;
    }
    
}