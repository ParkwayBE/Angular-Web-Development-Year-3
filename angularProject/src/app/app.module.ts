import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { EventsComponent } from './events/events.component';
import { PlannerComponent } from './planner/planner.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { Line1Component } from './line1/line1.component';
import { CardComponent } from './card/card.component';
import { FilepickerComponent } from './filepicker/filepicker.component';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule } from '@angular/forms';
import { SharedEventService } from './shared-event.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ShufflePipe } from './shufflePipe.pipe';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { Firestore, FirestoreModule, getFirestore, provideFirestore} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { AuthModule } from './auth/auth.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { StorageModule } from '@angular/fire/storage';
import { AuthGuard } from './auth.guard';

import { CanDeactivateGuard } from './can-deactivate.guard';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Auth3Guard } from './auth3.guard';
import { MyCustomDirectiveDirective } from './my-custom-directive.directive';
import { AngularFireModule } from '@angular/fire/compat';

const routes: Routes = [
  {path: '', redirectTo: '/events', pathMatch: 'full'},
  {path: 'events', component: EventsComponent, children: [
    {path: '', component: SearchResultsComponent},
    {path: 'search', component: SearchResultsComponent},
    {path: 'add', component: AddEventComponent, canActivate:[Auth3Guard]},
    {path: 'details/:id', component: EventDetailsComponent},
    {path: 'edit/:id', component: EditEventComponent, canActivate:[Auth3Guard], canDeactivate:[CanDeactivateGuard]}
    
  ]},
  {path: 'planner', component: PlannerComponent, canActivate: [AuthGuard]},
  {path: 'about', loadChildren:() => import('./about/about.module').then((m) => m.AboutModule)} 


];
@NgModule({
  declarations: [
    AppComponent,
    ProjectHeaderComponent,
    EventsComponent,
    PlannerComponent,
    HomeComponent,
    Line1Component,
    CardComponent,
    FilepickerComponent,
    AddEventComponent,
    SearchResultsComponent,
    EventDetailsComponent,
    EditEventComponent,
    ShufflePipe,
    LoginregisterComponent,
    MyCustomDirectiveDirective
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    StorageModule,
    AngularFireAuthModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [SharedEventService, AngularFireAuth],
  bootstrap: [AppComponent],
  
  
})
export class AppModule { }
