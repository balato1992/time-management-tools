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
    readonly unitOfOneTick = 20;

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

    _remainingTimeInUnit: number;
    get remainingTimeInSecond(): number {
        return this._remainingTimeInUnit * this.unitOfOneTick / 1000;
    }
    get strRemainingTime(): string {
        let str = Math.ceil(this.remainingTimeInSecond).toFixed(0);

        return str;
    }
    get percentage(): number {
        return this.remainingTimeInSecond / this.timeInSecond;
    }

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
        this._remainingTimeInUnit = 0;

        this.resume$ = new Subject();
        this.reset$ = new Subject();
        this.pause$ = new Subject();
        this.increase$ = new Subject();
        this.timesup$ = new Subject();
    }

    subscribe() {
        const unitOfAdd = 1000 / this.unitOfOneTick;

        let _this = this;
        let flag = false;

        this.subscription = merge(
            this.resume$.pipe(map(c => ({ counting: true }))),
            this.pause$.pipe(map(c => ({ counting: false }))),
            this.reset$.pipe(map(c => ({ counting: false, reset: true }))),
            this.increase$.pipe(map(c => ({ timeOfIncrement: unitOfAdd }))),
            this.timesup$.pipe(map(c => ({ timesUp: true }))),
        ).pipe(
            tap(({ reset }: TimerData) =>
                reset && (this._remainingTimeInUnit = this.timeInSecond * 1000 / this.unitOfOneTick)),
            tap(({ counting, reset }: TimerData) =>
                this.state = counting ? TimerState.Counting : reset ? TimerState.Ready : TimerState.Paused),
            tap(({ timesUp }: TimerData) =>
                this.state = timesUp ? TimerState.TimesUp : this.state),
            tap(({ timeOfIncrement }: TimerData) =>
                timeOfIncrement !== undefined && (this._remainingTimeInUnit += timeOfIncrement)),
            tap(({ counting }: TimerData) =>
                counting && (flag = false)),

            switchMap(({ counting }) => (counting ? timer(0, this.unitOfOneTick) : NEVER)
                .pipe(
                    map(n => this._remainingTimeInUnit - (n !== 0 ? 1 : 0)),
                    takeWhile(n => n >= 0 || (n < 0 && !flag)),
                )),
        ).subscribe({
            next(n) {
                _this._remainingTimeInUnit = (n >= 0) ? n : 0;

                if (_this._remainingTimeInUnit == 0) {
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


