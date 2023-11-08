import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type SkipQuestionEvent = MakeEvent<'skipQuestion', void>;

/**
 *
 */
export const skipQuestionEvent = assign<Ctx, SkipQuestionEvent>(
  (ctx, e): Partial<Ctx> => ({
    history: [...ctx.history, e]
  })
);
