import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { AnimationContainerComponent } from '../animation-container/animation-container.component';

@Component({
  selector: 'app-animation-container-group',
  templateUrl: './animation-container-group.component.html',
  styleUrls: ['./animation-container-group.component.scss']
})
export class AnimationContainerGroupComponent implements OnInit {

  @Input() showSlicks: boolean = true;

  @ContentChildren(AnimationContainerComponent) tabItems: QueryList<AnimationContainerComponent>;

  currentIndex: number = -1;
  get currentTabItem(): AnimationContainerComponent | undefined {

    return this.tabItems.get(this.currentIndex);
  }
  get tabLength(): number {

    return this.tabItems.length;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
  }

  switchToIndex(toIndex: number, isEase: boolean = false) {

    let itmesLength = this.tabItems.length;
    if (toIndex >= itmesLength) {
      toIndex = itmesLength - 1;
    }

    let currentIndex = this.currentIndex;
    this.currentIndex = toIndex;

    this.tabItems.forEach((t, i) => {

      let isShow = (i === currentIndex || i === toIndex);

      if (toIndex >= 0) {
        t.setVisible(i - toIndex, isShow, isEase);
      } else {
        t.setVisible(-1, isShow, isEase);
      }
    });
  }
}
