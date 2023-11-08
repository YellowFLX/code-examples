import {assign} from 'xstate';
import {TIMER_TICK} from '../constants';
import {Action, Ctx, MachineTimerKey} from '../types';

/**
 * This method ticks the timer in a given size (millisecond).
 * @param key key of the timer
 * @param tick tick in milliseconds
 * @returns
 */
export const tickTimer = (key: MachineTimerKey, tick = TIMER_TICK) =>
  assign<Ctx, Action>(ctx => {
    const timer = ctx.timers[key];

    if (ctx.current.pause) {
      return ctx;
    }

    return {
      timers: {
        ...ctx.timers,
        [key]: {...timer, current: timer.current + tick}
      }
    };
  });
