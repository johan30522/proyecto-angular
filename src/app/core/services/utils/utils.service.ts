import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public padNumber(num: number, padSize: number = 2): string {
    let paddedNumber = num.toString();
    while (paddedNumber.length < padSize) {
      paddedNumber = '0' + paddedNumber;
    }
    return paddedNumber;
  }
}
