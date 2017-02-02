import { Pipe, PipeTransform } from '@angular/core';
import * as distanceInWordsStrict from 'date-fns/distance_in_words_strict';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number) {
    if (!value) {
      return '';
    }
    return distanceInWordsStrict(new Date(), value) + ' ago';
  }
}
