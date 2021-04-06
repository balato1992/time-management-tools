import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { AnimationContainerGroupComponent } from '../animation-container-group/animation-container-group.component';
import { AnimationContainerComponent } from '../animation-container/animation-container.component';
import { TimerComponent, TimerButtonInfos } from '../timer/timer.component';
import { Timer, TimerState } from '../../class/timer';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html'
})
export class TimerPageComponent implements OnInit {

  @ViewChild('containerGroup') containerGroup: AnimationContainerGroupComponent;
  @ViewChild('timerAddingContainer') timerAddingContainer: AnimationContainerComponent;
  @ViewChild('timersContainer') timersContainer: AnimationContainerComponent;

  @ViewChild('timerComponent') timerComponent: TimerComponent;

  timers: Timer[] = [];
  tmpcount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getTimerInfos(state: TimerState): TimerButtonInfos {
    return {
      input: false,
      upperReset: state === TimerState.Paused,
      lowerReset: state === TimerState.TimesUp,
      start: state === TimerState.Ready || state === TimerState.Paused,
      pause: state === TimerState.Counting,
      textFlashing: state === TimerState.Paused || state === TimerState.TimesUp,
    };
  }

  showCancel() {
    return this.containerGroup?.currentTabItem === this.timerAddingContainer
      && this.timers.length > 0;
  }
  showAdd() {
    return this.containerGroup?.currentTabItem !== this.timerAddingContainer;
  }

  switchToTimerAdding() {
    this.containerGroup.switchTo(this.timerAddingContainer);
  }
  switchToTimers() {
    this.containerGroup.switchTo(this.timersContainer);
  }

  addTimer() {
    let totalSeconds = this.timerComponent.getInputTotalSeconds();

    let timer = new Timer();
    timer.subscribe();
    timer.getTimesup().subscribe(o => this.playAudio());
    timer.timeInSecond = totalSeconds;

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
