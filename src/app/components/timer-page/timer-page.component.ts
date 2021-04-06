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

  @ViewChild('timerComponent') timerComponent: TimerComponent;

  timers: Timer[] = [];
  btnVisibility: { cancel: boolean, add: boolean, delete: boolean } = {
    cancel: false,
    add: false,
    delete: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

  getInputDisplayInfo(): TimerDisplayInfo {

    let info = new TimerDisplayInfo();

    if (this.timerComponent !== undefined) {
      info.start = this.timerComponent.getInputTotalSeconds() > 0;
    }

    return info;
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
  setBtnVisibility() {

    this.btnVisibility = {
      cancel: this.containerGroup?.currentTabItem === this.timerAddingContainer && this.timers.length > 0,
      add: this.containerGroup?.currentTabItem === this.timersContainer,
      delete: this.containerGroup?.currentTabItem === this.timersContainer && this.timers.length > 0,
    };
  }

  addTimer() {
    let totalSeconds = this.timerComponent.getInputTotalSeconds();

    let timer = new Timer();
    timer.subscribe();
    timer.getTimesup().subscribe(o => this.playAudio());
    timer.timeInSecond = totalSeconds;

    this.timers.push(timer);

    this.switchToTimers();
  }
  deleteTimer() {
    if (this.containerGroup?.currentTabItem === this.timersContainer) {

      console.log("----");
      let current = this.timersContainerGroup?.currentTabItem;
      if (current !== undefined) {
        let uid = current.uid;
        let index = this.timers.findIndex(t => t.uid === uid);

        console.log(uid);
        console.log(index);
        if (index > -1) {
          this.timers[index].unsubscribe();
          this.timers.splice(index, 1);

          if (this.timers.length > 0) {
            this.switchToTimers();
          } else {
            this.switchToTimerAdding();
          }
        }
      }
    }
  }

  switchToTimerAdding() {
    this.timerComponent.clearInput();
    this.containerGroup.switchTo(this.timerAddingContainer);
    this.setBtnVisibility();
  }
  switchToTimers() {
    this.containerGroup.switchTo(this.timersContainer);
    this.setBtnVisibility();
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
