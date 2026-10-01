import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicEvent{
    id: number;
    name: string;
    imageData: string;
    date: string;
    location: string;
    description: string;
    going: boolean;
    constructor(){
        this.id = 0;
        this.name = "";
        this.imageData = "";
        this.date = "";
        this.location  = "";
        this.description = "";
        this.going = false;
    }
    
}
