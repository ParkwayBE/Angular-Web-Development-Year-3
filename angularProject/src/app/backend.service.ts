import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MusicEvent } from './musicevent.model';
import { Firestore, collectionData, doc, setDoc, updateDoc, collection, CollectionReference, DocumentReference, deleteDoc} from '@angular/fire/firestore';
import { docData, } from 'rxfire/firestore';

import { getDownloadURL, ref, Storage, uploadBytesResumable, list } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private db: Firestore, private storage: Storage) {}
  
  getEvents(): Observable<MusicEvent[]> {
    return collectionData<MusicEvent>(
      collection(this.db, 'events') as CollectionReference<MusicEvent>,
      {idField: 'id'}
    );
  }

  getEvent(id: string): Observable<MusicEvent>{
    return docData<MusicEvent>(
      doc(this.db, '/events/' + id) as DocumentReference<MusicEvent>
    )
  }

  deleteEvent(id: string){
    const eventRef = doc(this.db, 'events/'+id) as DocumentReference<MusicEvent>;
    return from(deleteDoc(eventRef));
  }

  createEvent(newEvent: MusicEvent, file1: File){
    const newID = doc(collection(this.db, 'id')).id;
    const ref = doc(this.db, 'events/'+newID);
    newEvent.id = newID;
    const path = 'events/' + newEvent.id + '/' + file1.name;
    this.uploadImg(path, file1);
    
    return from(setDoc(ref, newEvent));
  }

  updateEvent(event:MusicEvent, id: string){
    const eventRef = doc(this.db, 'events/'+id) as DocumentReference<MusicEvent>;
    return from(updateDoc(eventRef, event));
  }

  async uploadImg(path: string, file: File): Promise<string>{
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    await task;
    const url = await getDownloadURL(storageRef);
    return url;
  }

  getImg(id: string, name: string): Promise<string>
  {
    
    return getDownloadURL(ref(this.storage, 'events/'+id+'/'+name))
  }
  
 
 

  // getImageUrl(imagePath: string): Observable<string> {
  //   const storageRef = this.str.ref(imagePath);
  //   return storageRef.getDownloadURL();
  // }

}


