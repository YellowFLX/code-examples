import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type TypeBetEvent = MakeEvent<'typeBet', {questionUuid: string; bet: number}>;

/**
 *
 */
export const typeBetEvent = assign<Ctx, TypeBetEvent>(
  (ctx, e): Partial<Ctx> => ({
    history: [...ctx.history, e]
  })
);
