import { Pipe, PipeTransform } from '@angular/core';

import formatDistanceStrict = require('date-fns/formatDistanceStrict');

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number) {
    if (!value) {
      return '';
    }
    return formatDistanceStrict(new Date(), value) + ' ago';
  }
}
