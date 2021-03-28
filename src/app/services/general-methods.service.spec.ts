import { TestBed } from '@angular/core/testing';

import { GeneralMethodsService as gms } from './general-methods.service';

describe('GeneralMethodsService', () => {
  let service: gms;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(gms);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('formatByString should match all', () => {

    expect(gms.formatByString(0, "0")).toEqual("0");
    expect(gms.formatByString(0, "00")).toEqual("00");
    expect(gms.formatByString(0, "00000")).toEqual("00000");

    expect(gms.formatByString(1, "0")).toEqual("1");
    expect(gms.formatByString(1, "00")).toEqual("01");
    expect(gms.formatByString(1, "00000")).toEqual("00001");

    expect(gms.formatByString(2, "0")).toEqual("2");
    expect(gms.formatByString(2, "00")).toEqual("02");
    expect(gms.formatByString(2, "00000")).toEqual("00002");

    expect(gms.formatByString(10, "0")).toEqual("10");
    expect(gms.formatByString(10, "00")).toEqual("10");
    expect(gms.formatByString(10, "00000")).toEqual("00010");

    expect(gms.formatByString(20, "0")).toEqual("20");
    expect(gms.formatByString(20, "00")).toEqual("20");
    expect(gms.formatByString(20, "00000")).toEqual("00020");

    expect(gms.formatByString(100, "0")).toEqual("100");
    expect(gms.formatByString(100, "00")).toEqual("100");
    expect(gms.formatByString(100, "00000")).toEqual("00100");

    expect(gms.formatByString(100000, "0")).toEqual("100000");
    expect(gms.formatByString(100000, "00")).toEqual("100000");
    expect(gms.formatByString(100000, "00000")).toEqual("100000");
  });

  it('formatTimerText should match all', () => {

    expect(gms.formatTimerText(0)).toEqual("00");
    expect(gms.formatTimerText(1)).toEqual("01");
    expect(gms.formatTimerText(59)).toEqual("59");

    expect(gms.formatTimerText(60)).toEqual("01:00");
    expect(gms.formatTimerText(60+1)).toEqual("01:01");
    expect(gms.formatTimerText(60+59)).toEqual("01:59");
    expect(gms.formatTimerText(60+60)).toEqual("02:00");

    expect(gms.formatTimerText(3600+60)).toEqual("01:01:00");
    expect(gms.formatTimerText(3600+60+1)).toEqual("01:01:01");
    expect(gms.formatTimerText(3600+60+59)).toEqual("01:01:59");
    expect(gms.formatTimerText(3600+60+60)).toEqual("01:02:00");
    expect(gms.formatTimerText(3600+3600)).toEqual("02:00:00");
  });
});
