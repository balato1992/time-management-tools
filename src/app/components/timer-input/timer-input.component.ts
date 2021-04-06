import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timer-input',
  templateUrl: './timer-input.component.html',
  styleUrls: ['./timer-input.component.scss']
})
export class TimerInputComponent implements OnInit {

  readonly nums: Array<number> = Array.from(Array(60).keys());

  timeInfos: Array<{ name: string, value: number, toSeconds: number }>;

  constructor() {
    this.clear();
  }

  ngOnInit(): void { }

  getTotalSeconds(): number {

    let totalSeconds = 0;
    for (let info of this.timeInfos) {

      totalSeconds += info.value * info.toSeconds;
    }

    return totalSeconds;
  }

  clear() {
    this.timeInfos = [
      { name: "hour", value: 0, toSeconds: 3600 },
      { name: "minute", value: 0, toSeconds: 60 },
      { name: "second", value: 0, toSeconds: 1 },
    ];
  }
}
