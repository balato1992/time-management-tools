/// <reference lib="webworker" />
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const destory$ = new Subject();

addEventListener('message', ({ data }) => {
    switch (data) {
        case 'start':
            interval(1000).pipe(
                takeUntil(destory$)
            ).subscribe(_ => postMessage(new Date()));
            break;
        case 'stop':
            destory$.next();
            break;
    }
});
