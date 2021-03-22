import { timer } from 'rxjs';
import { merge, Subject, Subscription, NEVER } from 'rxjs';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';


export enum TimerState {
    Unknown = "Unknown",
    Ready = "Ready",
    Counting = "Counting",
    Paused = "Paused",
    TimesUp = "TimesUp"
}

interface TimerData {
    counting?: boolean;
    reset?: boolean;
    timesUp?: boolean;
    timeOfIncrement?: number;
}

export class Timer {
    name: string;
    state: TimerState;
    _timeInSecond: number;
    get timeInSecond(): number {
        return this._timeInSecond;
    }
    set timeInSecond(value: number) {
        this._timeInSecond = value;
        this.reset$.next(this._timeInSecond);
    }
    remainingTimeX10: number;
    ;

    private readonly resume$: Subject<void>;
    private readonly reset$: Subject<number>;
    private readonly pause$: Subject<void>;
    private readonly increase$: Subject<void>;
    subscription: Subscription | undefined;


    private readonly timesup$: Subject<void>;

    constructor() {
        this.name = "";
        this.state = TimerState.Unknown;
        this._timeInSecond = 0;
        this.remainingTimeX10 = 0;

        this.resume$ = new Subject();
        this.reset$ = new Subject();
        this.pause$ = new Subject();
        this.increase$ = new Subject();
        this.timesup$ = new Subject();
    }

    subscribe() {

        let _this = this;
        let flag = false;

        this.subscription = merge(
            this.resume$.pipe(map(c => ({ counting: true }))),
            this.pause$.pipe(map(c => ({ counting: false }))),
            this.reset$.pipe(map(c => ({ counting: false, reset: true }))),
            this.increase$.pipe(map(c => ({ timeOfIncrement: 1000 }))),
            this.timesup$.pipe(map(c => ({ timesUp: true }))),
        ).pipe(
            tap(({ reset }: TimerData) =>
                reset && (this.remainingTimeX10 = this.timeInSecond * 10)),
            tap(({ counting, reset }: TimerData) =>
                this.state = counting ? TimerState.Counting : reset ? TimerState.Ready : TimerState.Paused),
            tap(({ timesUp }: TimerData) =>
                this.state = timesUp ? TimerState.TimesUp : this.state),
            tap(({ timeOfIncrement }: TimerData) =>
                timeOfIncrement !== undefined && (this.remainingTimeX10 += timeOfIncrement)),
            tap(({ counting }: TimerData) =>
                counting && (flag = false)),

            switchMap(({ counting }) => (counting ? timer(0, 100) : NEVER)
                .pipe(
                    map(n => this.remainingTimeX10 - (n !== 0 ? 1 : 0)),
                    takeWhile(n => n >= 0 || (n < 0 && !flag)),
                )),
        ).subscribe({
            next(n) {
                _this.remainingTimeX10 = (n >= 0) ? n : 0;

                if (_this.remainingTimeX10 == 0) {
                    flag = true;

                    _this.pause$.next();
                    _this.timesup$.next();
                }
            },
            error(err) { console.error('something wrong occurred: ' + err); },
            complete() { console.log('done'); }
        });
    }

    getTimesup() {
        return this.timesup$.pipe();
    }

    resume() {
        this.resume$.next();
    }
    reset() {
        this.reset$.next(this._timeInSecond);
    }
    pause() {
        this.pause$.next();
    }
    add() {
        this.increase$.next();
    }
}


