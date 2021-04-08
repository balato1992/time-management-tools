import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { trigger, state, style, animate, transition, } from '@angular/animations';


const getCustomStyle = function (y: number, isOpacity: boolean = true) {
  return style({
    transform: 'translate3d(0, ' + y + '%, 0)',
    visibility: 'hidden',
    opacity: isOpacity ? 1 : 0,
  });
}

@Component({
  selector: 'app-animation-container',
  templateUrl: './animation-container.component.html',
  styleUrls: ['./animation-container.component.scss'],
  host: {
    '[@transformDiv]': 'getAnimationState()',
    '(@transformDiv.start)': 'onAnimationEvent($event)',
    '(@transformDiv.done)': 'onAnimationEvent($event)',
  },
  animations: [
    trigger('transformDiv', [
      state('center', style({})),
      state('center-ease', style({})),
      state('up', getCustomStyle(-100)),
      state('up-ease', getCustomStyle(-100)),
      state('down', getCustomStyle(100)),
      state('down-ease', getCustomStyle(100)),

      transition(':enter', [
        animate('0s')
      ]),
      transition(':leave', [
        style({
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          display: 'block',
          overflow: 'hidden',
          flexBasis: '100%',
        }),
        animate('.2s', getCustomStyle(-20, false))
      ]),
      transition('* => up-ease, * => down-ease', [
        animate('.2s', getCustomStyle(-20, false))
      ]),
      transition('* => center-ease', [
        getCustomStyle(-20, false),
        animate('.2s .3s')
      ]),
      transition('* <=> *', [
        animate('.3s')
      ]),
    ])
  ]
})
export class AnimationContainerComponent implements OnInit {

  @Input() showSlick: boolean = true;
  isShow: boolean = false;
  isAnimating: boolean = false;
  location: number = 1;
  lastLocation: number = 1;

  prefixEase: boolean = false;

  @HostBinding('class.active') get getTestactive(): boolean {
    return this.location == 0;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  getAnimationState(): string {

    let postfix = this.prefixEase ? '-ease' : '';

    if (this.location == 0)
      return 'center' + postfix;
    else if (this.location > 0)
      return 'down' + postfix;
    else
      return 'up' + postfix;
  }
  isShowContent(): boolean {
    return this.isShow || this.isAnimating;
  }

  setVisible(location: number, isShow: boolean, isEase: boolean = false) {
    this.lastLocation = this.location;
    this.location = location;
    this.isShow = isShow;
    this.prefixEase = isEase;
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
