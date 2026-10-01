import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: AboutmeComponent}

];

@NgModule({
  declarations: [
    AboutmeComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
})
export class AboutModule { }
