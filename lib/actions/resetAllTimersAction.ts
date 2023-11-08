import {assign} from 'xstate';
import {initialContext} from '../initialContext';
import {Ctx} from '../types';

/**
 * This action is used to reset all timers.
 */
export const resetAllTimersAction = assign<Ctx>({
  timers: initialContext.timers
});
