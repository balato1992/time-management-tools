import { Component, OnInit, Input, HostBinding, ComponentFactoryResolver } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-animation-container',
  templateUrl: './animation-container.component.html',
  styleUrls: ['./animation-container.component.scss'],
  animations: [
    trigger('transformDiv', [
      state('center', style({
        //transition: 'all 3s ease-in'
      })),
      state('left', style({
        transform: 'translate3d(-100%, 0px, 0px)',
        //transition: 'all 3s ease-in'
      })),
      state('right', style({
        transform: 'translate3d(100%, 0px, 0px)',
        //transition: 'all 3s ease-in'
      })),
      transition('* <=> *', [
        animate('.5s')
      ]),
    ])
  ]
})
export class AnimationContainerComponent implements OnInit {

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
    if (this.location == 0)
      return 'center';
    else if (this.location > 0)
      return 'right';
    else
      return 'left';
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
