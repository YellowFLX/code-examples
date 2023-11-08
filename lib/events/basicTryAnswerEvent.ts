import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type BasicTryAnswerEvent = MakeEvent<
  'basicTryAnswer',
  {questionUuid: string; timestamp: number}
>;

/**
 * This action is used to add a new tryAnswer to the tryAnswerBuffer.
 */
export const basicTryAnswerEvent = assign<Ctx, BasicTryAnswerEvent>(
  (ctx, e): Partial<Ctx> => {
    return {
      tryAnswerBuffer: [
        ...ctx.tryAnswerBuffer,
        {
          teamUuid: e.self.teamUuid,
          userUuid: e.self.userUuid,
          timestamp: e.payload.timestamp
        }
      ],
      history: [...ctx.history, e]
    };
  }
);
