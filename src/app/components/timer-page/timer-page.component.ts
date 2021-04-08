import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { AnimationContainerGroupComponent } from '../animation-container-group/animation-container-group.component';
import { TimerComponent, TimerDisplayInfo } from '../timer/timer.component';
import { Timer, TimerState } from '../../class/timer';


@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html'
})
export class TimerPageComponent implements OnInit {

  @ViewChild('containerGroup') containerGroup: AnimationContainerGroupComponent;
  @ViewChild('inputComponent') inputComponent: TimerComponent;

  timers: Timer[] = [];

  pageInfo: { state: number, lastIndex: number } = {
    state: 1,
    lastIndex: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showContainerPage(1);
    }, 0);
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
  getVisibilities() {

    let totalSeconds = this.inputComponent?.getInputTotalSeconds() ?? 0;

    return {
      showSlicks: this.pageInfo.state === 2,
      add: this.pageInfo.state === 1 && totalSeconds > 0,
      cancel: this.pageInfo.state === 1 && this.timers.length > 0,
      addTimer: this.pageInfo.state === 2,
      delete: this.pageInfo.state === 2 && this.timers.length > 0,
    };
  }

  showContainerPage(code: number) {

    let toIndex = 0;
    let tabLength = this.containerGroup.tabLength;
    let currentIndex = this.containerGroup.currentIndex;
    let lastIndex = this.pageInfo.lastIndex;

    switch (code) {
      case 1: // add timer page
        lastIndex = currentIndex > 0 ? currentIndex : 1;
        toIndex = 0;
        break;
      case 2: // cancal timer page
        toIndex = lastIndex;
        break;
      case 3: // add timer
        toIndex = tabLength;
        break;
      case 4: // delete timer
        lastIndex = currentIndex;
        toIndex = currentIndex + 1;
        if (toIndex === tabLength) {
          toIndex = currentIndex - 1;
        }
        break;
    }

    if (tabLength === 1) {
      toIndex = 0;
    }
    if (toIndex === 0) {
      this.inputComponent.clearInput();
    }

    this.containerGroup.switchToIndex(toIndex, true);
    this.pageInfo = {
      state: toIndex === 0 ? 1 : 2,
      lastIndex: lastIndex
    };
  }

  switchToAddingTimer() {
    this.showContainerPage(1);
  }
  cancalAddingTimer() {
    this.showContainerPage(2);
  }
  addTimer() {

    let timer = new Timer();
    timer.subscribe();
    timer.getTimesup().subscribe(o => this.playAudio());
    timer.timeInSecond = this.inputComponent.getInputTotalSeconds();

    this.timers.push(timer);

    setTimeout(() => {
      this.showContainerPage(3);
    }, 0);
  }
  deleteTimer() {

    let currentIndex = this.containerGroup.currentIndex - 1;
    if (currentIndex >= 0) {

      this.showContainerPage(4);

      this.timers[currentIndex].unsubscribe();
      this.timers.splice(currentIndex, 1);

      setTimeout(() => {
        this.showContainerPage(2);
      }, 0);
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
