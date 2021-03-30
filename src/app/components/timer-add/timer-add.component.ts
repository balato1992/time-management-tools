import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-timer-add',
  templateUrl: './timer-add.component.html',
  styleUrls: ['./timer-add.component.scss']
})
export class TimerAddComponent implements OnInit {

  readonly nums: Array<number> = Array.from(Array(60).keys());

  times: Array<{ name: string, value: number }> = [
    { name: "hour", value: 0 },
    { name: "minute", value: 0 },
    { name: "second", value: 0 },
  ];

  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
}
