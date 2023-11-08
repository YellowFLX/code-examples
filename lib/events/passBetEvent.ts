import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type PassBetEvent = MakeEvent<'passBet', {questionUuid: string}>;

/**
 *
 */
export const passBetEvent = assign<Ctx, PassBetEvent>(
  (ctx, e): Partial<Ctx> => ({
    history: [...ctx.history, e]
  })
);
