import {TransitionConfig} from 'xstate';
import {setTimerCtx, tickTimer} from '../../actions';
import {isTimerEnd} from '../../guards';
import {Action, Ctx, MachineTimerKey} from '../../types';
import {TIMER_TICK} from '../../constants';

type AlwaysDep = TransitionConfig<Ctx, Action>;

interface TimerOptions {
  /**
   * The state in which the timer will start.
   */
  from: string;
  /**
   * The state the machine will go to if the timer expires.
   */
  target: string;
  /**
   * Overwrite the timer (reset the current value) if it has already been started.
   */
  rewritable: boolean;
  /**
   * Timer duration in milliseconds.
   * @param ctx
   */
  duration: (ctx: Ctx) => number;
  /**
   * An array of additional actions to be performed on each tick of the timer.
   * @param deps
   */
  always?: (deps: AlwaysDep[]) => AlwaysDep[];
}

/**
 * This method is used to create a timer in state.
 * @param key key of the timer
 * @param options timer options
 * @returns
 */
export const createTimer = (key: MachineTimerKey, options: TimerOptions) => {
  const defaultAlways: AlwaysDep[] = [
    {
      target: options.target,
      cond: isTimerEnd(key)
    }
  ];

  return {
    entry: setTimerCtx(key, ctx => {
      const timer = ctx.timers[key];
      return {
        ...timer,
        current: options.rewritable ? 0 : timer.current,
        duration: options.duration(ctx)
      };
    }),
    after: {
      [TIMER_TICK]: {
        target: options.from,
        actions: tickTimer(key)
      }
    },
    always: options.always ? options.always(defaultAlways) : defaultAlways
  };
};
