import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTohuman'
})
export class BooleanTohumanPipe implements PipeTransform {

  transform(value: boolean | string): string {
    let safeValue: boolean;

    if (typeof value !== 'string') {
      safeValue = value;
    } else {
      safeValue = value === 'true';
    }

    return safeValue ? 'Yes' : 'No';
  }

}
