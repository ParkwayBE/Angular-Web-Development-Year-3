import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-line1',
  templateUrl: './line1.component.html',
  styleUrls: ['./line1.component.css']
})
export class Line1Component {
  scrolling = false;
  private intervalId: any;

  startScrolling(shouldScroll: boolean): void {
    if (shouldScroll) {
      this.intervalId = setInterval(() => {
        const list = document.querySelector('.scroll-list');
        if (list) {
          list.scrollLeft += 2; // Adjust the scroll speed as needed
        }
      }, 10);
    } else {
      this.stopScrolling();
    }
  }

  stopScrolling(): void {
    clearInterval(this.intervalId);
    const list2 = document.querySelector('.scroll-list');
    if(list2)
    {
    list2.scrollLeft = 0;
    }
  }
}