import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { Timer } from '../class/timer';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html'
})
export class TimerPageComponent implements OnInit {

  timers: Timer[] = [];
  tmpcount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  addTimer() {
    let timer = new Timer();

    this.timers.push(timer);
  }

  startTimer(timer: Timer) {

    timer.start();
  }
  pauseTimer(timer: Timer) {

    timer.pause();
  }
  resumeTimer(timer: Timer) {

    timer.resume();
  }
  resetTimer(timer: Timer) {

    timer.reset();
  }
  
  deleteTimer() {
  }
}
