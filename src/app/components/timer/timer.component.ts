import { Component, OnInit, Input } from '@angular/core';

import { Timer, TimerState } from '../../class/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input() timer: Timer;

  constructor() {

  }

  ngOnInit(): void {
  }


  flashText(state: TimerState) {
    return state == TimerState.Paused || state == TimerState.TimesUp;
  }
  showUpperStop(state: TimerState) {
    return state == TimerState.Paused;
  }
  showLowerStop(state: TimerState) {
    return state == TimerState.TimesUp;
  }
  showPlay(state: TimerState) {
    return state == TimerState.Ready || state == TimerState.Paused;
  }
  showPause(state: TimerState) {
    return state == TimerState.Counting;
  }

  deleteTimer() {
  }

}
