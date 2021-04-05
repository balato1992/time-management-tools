import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

// reference: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle

@Component({
  selector: 'app-timer-spinner',
  templateUrl: './timer-spinner.component.html',
  styleUrls: ['./timer-spinner.component.scss']
})
export class TimerSpinnerComponent implements OnInit {

  @Input() width: string;
  @Input() height: string;
  @Input() text: string;
  @Input() flashText: boolean;
  @Input() percentage: number;
  size: number = 400;
  
  pathDrawn: string;
  pathCX: number;
  pathCY: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.percentage) {

      let value = changes.percentage.currentValue;
      if (Number.isNaN(value)) {
        value = 0;
      }
      this.drawArc(value * 360);
    }
  }

  getArcPosition(center: { x: number, y: number }, radius: number, angle: number) {
    let angleInRadians = (angle - 90) / 180.0 * Math.PI;

    return {
      x: center.x + radius * Math.cos(angleInRadians),
      y: center.y + radius * Math.sin(angleInRadians)
    };
  }
  normalizeAngle(angle: number) {
    if (Math.abs(angle) > 360) {
      angle %= 360;
    }
    if (angle < 0) {
      angle += 360;
    }

    return angle;
  }

  drawArc(endAngle: number = 360) {
    endAngle = this.normalizeAngle(endAngle);

    const center = { x: this.size / 2, y: this.size / 2 };
    const radius = this.size * 0.4;
    const startAngle = 0;

    let start = this.getArcPosition(center, radius, startAngle);
    let end = this.getArcPosition(center, radius, endAngle);

    let angleMoreThan180: Array<any> = [];
    if (endAngle > 180) {
      let p180 = this.getArcPosition(center, radius, startAngle + 180);
      angleMoreThan180 = [
        "A", radius, radius, 0, 0, 1, p180.x, p180.y,
      ];
    }

    let drawn = [
      "M", start.x, start.y,
      ...angleMoreThan180,
      "A", radius, radius, 0, 0, 1, end.x, end.y
    ];

    this.pathDrawn = drawn.join(" ");
    this.pathCX = end.x;
    this.pathCY = end.y;
  }

}
