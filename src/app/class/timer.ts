import { interval, merge, Observable, Subject, Subscription, NEVER } from 'rxjs';
import { map, mapTo, repeatWhen, startWith, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';

export class Timer {
    name: string;
    status: string;
    counter: number;
    currentCounter10: number;

    start$: Subject<number>;
    resume$: Subject<number>;
    reset$: Subject<number>;
    pause$: Subject<number>;
    //countInterval$: Observable<Observable<number>>;
    subscription: Subscription | undefined;

    constructor() {
        this.name = "";
        this.status = "";
        this.counter = 0;
        this.currentCounter10 = 0;

        this.start$ = new Subject();
        this.resume$ = new Subject();
        this.reset$ = new Subject();
        this.pause$ = new Subject();

        this.subscription = merge(
            this.start$.pipe(mapTo({ counting: true, reset: true })),
            this.resume$.pipe(mapTo({ counting: true, reset: false })),
            this.reset$.pipe(mapTo({ counting: false, reset: true })),
            this.pause$.pipe(mapTo({ counting: false, reset: false })),
        ).pipe(
            startWith({ counting: false, reset: true }),
            tap(({ reset }) => this.currentCounter10 = reset ? this.counter * 10 : this.currentCounter10),
            tap(({ counting, reset }) => this.status = counting ? "counting" : reset ? "ready" : "pause"),
            switchMap(({ counting }) => (counting ? interval(100) : NEVER)
                .pipe(
                    map(_ => this.currentCounter10 - 1),
                    takeWhile(n => n >= 0),
                    tap(n => this.currentCounter10 = n)
                ))
        ).subscribe(console.log)
    }

    setName(name: string) {
        this.name = name;
    }
    setCounter(counter: number) {
        this.counter = counter;
    }

    start() {
        this.start$.next();
    }
    resume() {
        this.resume$.next();
    }
    reset() {
        this.reset$.next();
    }
    pause() {
        this.pause$.next();
    }
}


