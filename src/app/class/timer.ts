import { interval, merge, Subject, Subscription, NEVER } from 'rxjs';
import { map, mapTo, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';


export enum TimerState {
    Unknown = "Unknown",
    Ready = "Ready",
    Counting = "Counting",
    Paused = "Paused"
}

interface TimerData {
    counting?: boolean;
    reset?: boolean;
    resetValue?: number;
}

export class Timer {
    name: string;
    state: TimerState;
    _counter: number;
    get counter(): number {
        return this._counter;
    }
    set counter(value: number) {
        this._counter = value;
        this.reset$.next(this._counter);
    }
    currentCounter10: number;

    private readonly start$: Subject<number>;
    private readonly resume$: Subject<number>;
    private readonly reset$: Subject<number>;
    private readonly pause$: Subject<number>;
    subscription: Subscription | undefined;

    constructor() {
        this.name = "";
        this.state = TimerState.Unknown;
        this._counter = 0;
        this.currentCounter10 = 0;

        this.start$ = new Subject();
        this.resume$ = new Subject();
        this.reset$ = new Subject();
        this.pause$ = new Subject();
    }

    private _resetCurrentCounter(_this: Timer, { reset, resetValue }: TimerData) {
        if (reset && resetValue !== undefined) {
            _this.currentCounter10 = resetValue * 10;
        }
    }
    private _changeState(_this: Timer, { counting, reset }: TimerData) {
        if (counting !== undefined && reset !== undefined) {
            _this.state = counting ? TimerState.Counting : reset ? TimerState.Ready : TimerState.Paused
        }
    }

    subscribe(finished: Function) {
        this.subscription = merge(
            this.start$.pipe(mapTo({ counting: true, reset: true })),
            this.resume$.pipe(mapTo({ counting: true, reset: false })),
            this.reset$.pipe(map(c => ({ counting: false, reset: true, resetValue: c }))),
            this.pause$.pipe(mapTo({ counting: false, reset: false })),
        ).pipe(
            //startWith({ counting: false, reset: true }),
            tap(o => this._resetCurrentCounter(this, o)),
            tap(o => this._changeState(this, o)),
            switchMap(({ counting }: TimerData) => (counting ? interval(100) : NEVER)
                .pipe(
                    map(_ => this.currentCounter10 - 1),
                    takeWhile(n => n >= 0),
                    tap(n => this.currentCounter10 = n)
                ))
        ).subscribe();

    }
    start() {
        this.start$.next();
    }
    resume() {
        this.resume$.next();
    }
    reset() {
        this.reset$.next(this._counter);
    }
    pause() {
        this.pause$.next();
    }
}


