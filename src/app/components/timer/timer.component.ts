import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { TimerInputComponent } from '../timer-input/timer-input.component';

export class TimerButtonInfos {
  input: boolean = true;
  upperReset: boolean = false;
  lowerReset: boolean = false;
  start: boolean = true;
  pause: boolean = false;
  textFlashing: boolean = false;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() buttonInfos: TimerButtonInfos = new TimerButtonInfos();
  @Input() spinnerText: string = '';
  @Input() spinnerPercentage: number = 0;

  @Output() start = new EventEmitter<any>();
  @Output() pause = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();

  @ViewChild('timerInput') timerInput: TimerInputComponent;

  constructor() {
  }

  ngOnInit(): void {
  }


  getInputTotalSeconds(): number {

    return this.timerInput.getTotalSeconds();
  }
}
