import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { AnimationContainerComponent } from '../animation-container/animation-container.component';


@Component({
  selector: 'app-animation-container-group',
  templateUrl: './animation-container-group.component.html',
  styleUrls: ['./animation-container-group.component.scss']
})
export class AnimationContainerGroupComponent implements OnInit {

  @ContentChildren(AnimationContainerComponent) tabItems: QueryList<AnimationContainerComponent>;

  currentTabItem: AnimationContainerComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    console.log(this.tabItems.length);
  }

  showItem(tabItem: AnimationContainerComponent) {

    let arrTabItems = this.tabItems.toArray();

    let lastTabItem = this.currentTabItem;
    this.currentTabItem = tabItem;

    let index = arrTabItems.findIndex(t => t == tabItem);
    arrTabItems.forEach((t, i) => {

      let isShow = (t === lastTabItem || t === tabItem);

      t.setVisible(i - index, isShow);
    });

  }
}
