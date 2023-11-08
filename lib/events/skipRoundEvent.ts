import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type SkipRoundEvent = MakeEvent<'skipRound', void>;

/**
 *
 */
export const skipRoundEvent = assign<Ctx, SkipRoundEvent>(
  (ctx, e): Partial<Ctx> => ({
    history: [...ctx.history, e]
  })
);
