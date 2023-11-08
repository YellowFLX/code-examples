import {assign} from 'xstate';
import {Action, Ctx, MachineTimer, MachineTimerKey} from '../types';

/**
 * This method is used to set a timer in context.
 * @param key key of the timer
 * @param fn a function that returns the timer duration
 * @returns
 */
export const setTimerCtx = (key: MachineTimerKey, fn: (ctx: Ctx) => MachineTimer) =>
  assign<Ctx, Action>((ctx, e) => {
    // Skip setting the timer if the event is from xstate.
    if (e.type.includes('xstate.after')) return ctx;
    return {
      timers: {...ctx.timers, [key]: fn(ctx)}
    };
  });
