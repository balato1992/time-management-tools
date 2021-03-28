import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralMethodsService {

  constructor() { }

  // reference: https://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
  // num: positive integer
  // formatByString: char
  static formatByString(num: number, formatByString: string) {

    let numLength = Math.floor(Math.log10(num)) + 1;
    let sliceStart = Math.max(numLength, formatByString.length);

    return String(formatByString + num).slice(-sliceStart);
  };


  static formatTimerText(timeInSecond: number): string {
    let strTimes = [];

    let hour = Math.floor(timeInSecond / 3600);
    timeInSecond -= hour * 3600;

    let minute = Math.floor(timeInSecond / 60);
    timeInSecond -= minute * 60;

    let second = Math.floor(timeInSecond);

    let lastDigitIsNotZero = false;
    strTimes = [hour, minute, second]
      .filter((num, index) => {
        if (lastDigitIsNotZero
          || num > 0
          || index === 2 /* second must show*/) {
          lastDigitIsNotZero = true;
          return true;
        } else {
          return false;
        }
      })
      .map(o => this.formatByString(o, "00"));

    return strTimes.join(":");
  }
}
