import {describe, expect, it} from 'vitest';
import {isTimerEnd} from './isTimerEnd';
import {initialContext} from '../../initialContext';

describe('isTimerEnd', () => {
  it('should return false if timer value >= duration', () => {
    expect(
      isTimerEnd('answer')({
        ...initialContext,
        timers: {...initialContext.timers, answer: {current: 5, duration: 10}}
      })
    ).toBe(false);
  });

  it('should return false if timer value < duration', () => {
    expect(isTimerEnd('answer')(initialContext)).toBe(true);
    expect(
      isTimerEnd('answer')({
        ...initialContext,
        timers: {...initialContext.timers, answer: {current: 10, duration: 10}}
      })
    ).toBe(true);
  });
});
