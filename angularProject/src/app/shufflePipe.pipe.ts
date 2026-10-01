import { Pipe, PipeTransform } from '@angular/core';
import { MusicEvent } from './musicevent.model';

@Pipe({
  name: 'customPipe'
})
export class ShufflePipe implements PipeTransform {
  transform(array: MusicEvent[]): MusicEvent[] {
    const result = [...array];
    
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  
    return result;
  }
  
}