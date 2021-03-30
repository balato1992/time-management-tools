import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

import { TimerPageComponent } from './components/timer-page/timer-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimerSpinnerComponent } from './components/timer-spinner/timer-spinner.component';
import { TimerAddComponent } from './components/timer-add/timer-add.component';
import { AnimationContainerComponent } from './components/animation-container/animation-container.component';
import { AnimationContainerGroupComponent } from './components/animation-container-group/animation-container-group.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerPageComponent,
    MainPageComponent,
    TimerComponent,
    TimerSpinnerComponent,
    TimerAddComponent,
    AnimationContainerComponent,
    AnimationContainerGroupComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
