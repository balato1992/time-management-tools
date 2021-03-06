import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { TimerPageComponent } from './components/timer-page/timer-page.component';
import { PageClockComponent } from './components/page-clock/page-clock.component';

const routes: Routes = [
  { path: 'timer', component: TimerPageComponent },
  { path: 'clock', component: PageClockComponent },
  { path: '**', component: MainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
