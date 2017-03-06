import { Pipe, PipeTransform } from '@angular/core';
import { distanceInWordsStrict } from 'date-fns';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number) {
    if (!value) {
      return '';
    }
    return distanceInWordsStrict(new Date(), value) + ' ago';
  }
}
