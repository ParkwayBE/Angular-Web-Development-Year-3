import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  private messageSubject = new Subject<string>();
  messages: string[] = [];
  inputf: string =  "";

  ngOnInit(): void {
    this.messageSubject.subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    const message = this.messages.length+" "+this.inputf;
    this.messageSubject.next(message);
  }

  ngOnDestroy(): void {
    this.messageSubject.unsubscribe();
  }
}

