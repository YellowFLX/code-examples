import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type PassTryAnswerEvent = MakeEvent<'passTryAnswer', {questionUuid: string}>;

/**
 * This action is used to add a new tryAnswer to the tryAnswerBuffer.
 */
export const passTryAnswerEvent = assign<Ctx, PassTryAnswerEvent>(
  (ctx, e): Partial<Ctx> => ({
    history: [...ctx.history, e]
  })
);
