import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {


  constructor() {
    console.log('Initial load of Calculator Service');
   }

  public sum(num1: number, num2: number): number{
    return num1 + num2;
  }


}
