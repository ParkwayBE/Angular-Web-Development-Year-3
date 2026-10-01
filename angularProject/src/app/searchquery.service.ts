import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchqueryService {
  triggerFunction: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
}
