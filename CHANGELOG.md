
# TODO

- timer
  - timers throttling by browser
  - start timer immediately
  - unsubscribe
  - change sound
  - sound last until click stop button or other mechanism
  - add time
  - figure out how tab css work
  - alart in page
  - timer name
  - test sound location
  - gesture
- multiple timer
  - forbid button click while animating
  - style without button
  - limit timer count

- add github link
- add instructions
- timer series
- style: dark mode
- multiple language
- add test

# DONE

- timer
  - play
  - pause
  - reset
  - delete
  - UI
    - spinner
    - format remaining time
    - flashing remaining time when time paused
- multiple timer
  - slicks
  - animations

# CHANGE LOG

- 20210408
  1. animation-container.component: improve switching mechanism and animation
  2. style: add _variables.scss to store variable
- 20210407
  1. animation-container.component: change switchItem to switch index
  2. animation-container.component: imporve slick style
  3. timer.component: spinner initialized with 1
  4. imporve style
- 20210406
  1. spinner: use 'size' to control width, height, etc.
  2. spinner: add circle and change style
  3. change 'timer-add' to 'timer-input'
  4. spinner: add primary color arc and code refine
  5. timer: change appearance
  6. spinner: if percentage isn't valid show 100%
  7. timerInput: add getTotalSeconds and refine code
  8. timer: move timer controlling to timerPage
  9. timer class: add uid
- 20210401
  1. refine some code and style
- 20210330
  1. add animation-container component
  2. add animation-container-group component
  3. add timer-add component
- 20210329
  1. put remaining time in spinner
  2. format remaining time and add unit test
  3. move file location
- 20210324
  1. create timer component
  2. change project name
  3. modify style
  4. change Copyright
  5. add timer-spinner
  6. change remainingTime10 to remainingTimeInUnit
- 20210323 adjust timer and add time's up sound
  1. adjust timer
  2. add time's up sound
  3. modify html and style
  4. chagne style format from css to scss
