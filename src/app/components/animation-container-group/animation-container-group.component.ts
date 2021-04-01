import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { AnimationContainerComponent } from '../animation-container/animation-container.component';


@Component({
  selector: 'app-animation-container-group',
  templateUrl: './animation-container-group.component.html',
  styleUrls: ['./animation-container-group.component.scss']
})
export class AnimationContainerGroupComponent implements OnInit {

  @ContentChildren(AnimationContainerComponent) tabItems: QueryList<AnimationContainerComponent>;

  currentTabItem: AnimationContainerComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {

    if (this.tabItems.length > 0) {
      this.switchTo(this.tabItems.get(0));
    }
  }

  switchTo(tabItem: AnimationContainerComponent | undefined) {

    let arrTabItems = this.tabItems.toArray();

    let lastTabItem = this.currentTabItem;
    this.currentTabItem = tabItem;

    let index = arrTabItems.findIndex(t => t == tabItem);
    arrTabItems.forEach((t, i) => {

      let isShow = (t === lastTabItem || t === tabItem);

      if (index >= 0) {
        t.setVisible(i - index, isShow);
      }
      else {
        t.setVisible(-1, isShow);
      }
    });

  }
}
