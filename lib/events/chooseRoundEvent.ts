import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type ChooseRoundEvent = MakeEvent<'chooseRound', {roundUuid: string}>;

/**
 *
 */
export const chooseRoundEvent = assign<Ctx, ChooseRoundEvent>(
  (ctx, e): Partial<Ctx> => ({
    current: {
      ...ctx.current,
      roundUuid: e.payload.roundUuid
    },
    history: [...ctx.history, e]
  })
);
