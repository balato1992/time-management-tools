import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { AnimationContainerGroupComponent } from '../animation-container-group/animation-container-group.component';
import { AnimationContainerComponent } from '../animation-container/animation-container.component';
import { TimerComponent, TimerDisplayInfo } from '../timer/timer.component';
import { Timer, TimerState } from '../../class/timer';


@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html'
})
export class TimerPageComponent implements OnInit {

  @ViewChild('containerGroup') containerGroup: AnimationContainerGroupComponent;
  @ViewChild('timerAddingContainer') timerAddingContainer: AnimationContainerComponent;
  @ViewChild('timersContainer') timersContainer: AnimationContainerComponent;

  @ViewChild('timersContainerGroup') timersContainerGroup: AnimationContainerGroupComponent;
  @ViewChild('inputComponent') inputComponent: TimerComponent;

  timers: Timer[] = [];
  pageNum: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.showContainerPage(1);
  }

  getTimerInfos(state: TimerState): TimerDisplayInfo {
    return {
      input: false,
      upperReset: state === TimerState.Paused,
      lowerReset: state === TimerState.TimesUp,
      start: state === TimerState.Ready || state === TimerState.Paused,
      pause: state === TimerState.Counting,
      textFlashing: state === TimerState.Paused || state === TimerState.TimesUp,
    };
  }
  getBtnVisibility() {

    let totalSeconds = this.inputComponent?.getInputTotalSeconds() ?? 0;

    return {
      add: this.pageNum === 1 && totalSeconds > 0,
      cancel: this.pageNum === 1 && this.timers.length > 0,
      addTimer: this.pageNum === 2,
      delete: this.pageNum === 2 && this.timers.length > 0,
    };
  }

  showContainerPage(num: number) {

    if (num === 1) {
      this.inputComponent.clearInput();
      this.containerGroup.switchToItem(this.timerAddingContainer);
    }
    else if (num === 2) {
      this.containerGroup.switchToItem(this.timersContainer);
    }
    this.pageNum = num;
  }

  addTimer() {

    let timer = new Timer();
    timer.subscribe();
    timer.getTimesup().subscribe(o => this.playAudio());
    timer.timeInSecond = this.inputComponent.getInputTotalSeconds();

    this.timers.push(timer);

    setTimeout(() => {
      this.timersContainerGroup.switchToLast();
      this.showContainerPage(2);
    }, 0);
  }
  deleteTimer() {

    let currentIndex = this.timersContainerGroup.currentIndex;
    if (currentIndex >= 0) {

      if (this.timers.length <= 1) {
        this.showContainerPage(1);
      } else {
        this.showContainerPage(2);
      }
      this.timersContainerGroup.switchToIndex(currentIndex - 1);

      this.timers[currentIndex].unsubscribe();
      this.timers.splice(currentIndex, 1);

    }
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
