import { Component, OnInit } from '@angular/core';

import { Timer, TimerState } from '../../class/timer';

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
    timer.subscribe();
    timer.getTimesup().subscribe(o => this.playAudio());

    this.timers.push(timer);
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../audio/zapsplat_household_alarm_clock_digital_beeps_001_60068.mp3";
    audio.load();
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 800);
  }
}
