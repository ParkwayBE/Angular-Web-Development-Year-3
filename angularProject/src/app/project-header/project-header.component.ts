import { Component } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

declare function moveIt(direction: string): void;
@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.css']
})
export class ProjectHeaderComponent {
  href: string[] = [];
  widgetDirection: string = "";

  constructor(route: ActivatedRoute, private _authService: AuthService){
    
  }
  ngOnInit() {
   
    this.href = window.location.href.split('/');
    
    this.widgetDirection = this.href[this.href.length-1];
    if(this.widgetDirection == "planner")
    {
    moveIt("right");
    }
    
  }
  move():void{
    if(this.widgetDirection == "events")
    {
      moveIt("right");
      this.widgetDirection = "planner";
      console.log('right');
    }
    else if(this.widgetDirection == "planner")
    {
      moveIt("left");
      this.widgetDirection = "events";
      console.log('left');
    }
    
  }
  onLogout(): void{
    this._authService.logout();
  }
  get authService(){
    return this._authService;
  }
}
