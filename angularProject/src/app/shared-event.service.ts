import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedEventService {
  sharedEvent: any;
  triggerFunction: EventEmitter<void> = new EventEmitter<void>();
  triggerFunction2: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
}
