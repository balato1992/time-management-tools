import { Component, OnInit, Input } from '@angular/core';

import { Timer, TimerState } from '../../class/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'
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
  showPlay(state: TimerState) {
    return state == TimerState.Ready || state == TimerState.Paused;
  }
  showPause(state: TimerState) {
    return state == TimerState.Counting;
  }
  showStop(state: TimerState) {
    return state == TimerState.Paused || state == TimerState.TimesUp;
  }

  deleteTimer() {
  }

}
