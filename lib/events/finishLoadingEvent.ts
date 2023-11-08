import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type FinishLoadingEvent = MakeEvent<'finishLoading', {questionUuid: string}>;

/**
 *
 */
export const finishLoadingEvent = assign<Ctx, FinishLoadingEvent>(
  (ctx, e): Partial<Ctx> => ({
    history: [...ctx.history, e]
  })
);
