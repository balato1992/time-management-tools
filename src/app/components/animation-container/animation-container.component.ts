import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-animation-container',
  templateUrl: './animation-container.component.html',
  styleUrls: ['./animation-container.component.scss'],
  animations: [
    trigger('transformDiv', [
      state('center', style({
      })),
      state('up', style({
        transform: 'translate3d(0, -100%, 0px)',
        visibility: 'hidden',
      })),
      state('down', style({
        transform: 'translate3d(0, 100%, 0px)',
        visibility: 'hidden',
      })),
      state('up-ease', style({
        transform: 'translate3d(0, -20%, 0px)',
        opacity: 0,
        visibility: 'hidden',
      })),
      state('down-ease', style({
        transform: 'translate3d(0, 20%, 0px)',
        opacity: 0,
        visibility: 'hidden',
      })),
      transition('* => up-ease, * => down-ease', [
        animate('.2s')
      ]),
      transition('up-ease => *, down-ease => *', [
        animate('.2s .3s ease-out')
      ]),
      transition('* <=> *', [
        animate('.3s')
      ]),
    ])
  ]
})
export class AnimationContainerComponent implements OnInit {

  @Input() easeIn: boolean = false;
  isShow: boolean = false;
  isAnimating: boolean = false;
  location: number = 0;

  @HostBinding('class.active') get getTestactive(): boolean {
    return this.location == 0;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  getAnimationState(): string {
    if (!this.easeIn) {

      if (this.location == 0)
        return 'center';
      else if (this.location > 0)
        return 'down';
      else
        return 'up';
    } else {

      if (this.location == 0)
        return 'center';
      else if (this.location > 0)
        return 'up-ease';
      else
        return 'down-ease';
    }
  }
  isShowContent(): boolean {
    return this.isShow || this.isAnimating;
  }

  setVisible(location: number, isShow: boolean) {
    this.location = location;
    this.isShow = isShow;
  }

  onAnimationEvent(event: any) {

    if (this.isShow && event.phaseName == 'start') {
      this.isAnimating = true;
    }
    if (event.phaseName == 'done') {
      this.isAnimating = false;
    }
  }
}
