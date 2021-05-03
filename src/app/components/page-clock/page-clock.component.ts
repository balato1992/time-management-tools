import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-page-clock',
  templateUrl: './page-clock.component.html'
})
export class PageClockComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  time: Date;
  isAlarmOnTheHour: boolean;
  audio: HTMLAudioElement;
  audioCount: number;

  constructor() {

    this.subscription = interval(1000).subscribe(_ => {
      this.time = new Date();

      if (this.isAlarmOnTheHour) {
        let now = new Date();
        let min = now.getMinutes();
        let sec = now.getSeconds();

        if (this.audioCount === 0 && min === 0 && sec <= 3) {
          this.audioCount = 3;
          this.audio.currentTime = 0;
          this.audio.play();
        }
      }
    });
    this.time = new Date();
    this.isAlarmOnTheHour = false;
    this.audio = this.getAudio();
    this.audioCount = 0;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  getAudio() {
    let audio = new Audio();
    audio.src = "../../audio/zapsplat_household_clock_cuckoo_strike_003.mp3";
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
