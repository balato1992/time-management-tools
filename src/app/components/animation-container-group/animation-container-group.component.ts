import { Component, OnInit, ContentChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { AnimationContainerComponent } from '../animation-container/animation-container.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-animation-container-group',
  templateUrl: './animation-container-group.component.html',
  styleUrls: ['./animation-container-group.component.scss']
})
export class AnimationContainerGroupComponent implements OnInit {

  @ContentChildren(AnimationContainerComponent) tabItems: QueryList<AnimationContainerComponent>;

  currentIndex: number = -1;
  get currentTabItem(): AnimationContainerComponent | undefined {

    return this.tabItems.get(this.currentIndex);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.tabItems.changes.pipe(delay(0)).subscribe(() => {
      this.switchToIndex(this.currentIndex);
    });

    this.switchToFirst();
  }


  switchToIndex(toIndex: number) {

    let itmesLength = this.tabItems.length;
    if (toIndex >= itmesLength) {
      toIndex = itmesLength - 1;
    }

    let currentIndex = this.currentIndex;
    this.currentIndex = toIndex;

    this.tabItems.forEach((t, i) => {

      let isShow = (i === currentIndex || i === toIndex);

      if (toIndex >= 0) {
        t.setVisible(i - toIndex, isShow);
      } else {
        t.setVisible(-1, isShow);
      }
    });
  }
  switchToFirst() {
    this.switchToIndex(0);
  }
  switchToLast() {
    this.switchToIndex(this.tabItems.length);
  }
  switchToItem(tabItem: AnimationContainerComponent | undefined) {

    let index = this.tabItems.toArray().findIndex(t => t == tabItem);

    this.switchToIndex(index);
  }

}
