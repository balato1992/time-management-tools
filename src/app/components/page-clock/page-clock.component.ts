import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-page-clock',
  templateUrl: './page-clock.component.html'
})
export class PageClockComponent implements OnInit, OnDestroy {

  displayTime: Date;
  isAlarmOnTheHour: boolean;
  private audio: HTMLAudioElement;
  private audioCount: number;
  private worker: Worker;

  testMin: number = 0;

  constructor() {

    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('./timer.worker', { type: 'module' });
      // 監聽訊息
      this.worker.onmessage = ({ data }) => {

        this.displayTime = data;
        let min = data.getMinutes();
        let sec = data.getSeconds();

        if (this.isAlarmOnTheHour && this.audioCount === 0 && min === this.testMin && sec <= 3) {
          this.audioCount = 3;
          this.audio.currentTime = 0;
          this.audio.play();
        }
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

    this.displayTime = new Date();
    this.isAlarmOnTheHour = false;
    this.audio = this.getAudio();
    this.audioCount = 0;

    this.startWorker();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.stopWorker();
  }

  startWorker() {
    if (!this.worker) {
      return;
    }
    console.log("startWorker ");
    this.worker.postMessage('start');
  }
  stopWorker() {
    if (!this.worker) {
      return;
    }
    console.log("stopWorker ");
    this.worker.postMessage('stop');
  }

  getAudio() {
    let audio = new Audio();
    audio.src = "../../audio/zapsplat_household_clock_cuckoo_strike_001.mp3";
    audio.load();
    audio.addEventListener('ended', () => {

      if (--this.audioCount > 0) {
        audio.currentTime = 0;
        audio.play();
      }
    }, false);

    return audio;
  }
}
