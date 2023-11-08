import {Ctx, MachineTimerKey} from '../../types';

/**
 *
 * @param key key of the timer
 * @returns
 */
export const isTimerEnd = (key: MachineTimerKey) => (ctx: Ctx) => {
  const timer = ctx.timers[key];
  return timer.current >= timer.duration;
};
