import {assign} from 'xstate';
import {Action, Ctx} from '../types';
import {getNextRoundUuid} from '../libs';

/**
 * This action set the next available round.
 */
export const setNextRound = assign<Ctx, Action>((ctx): Partial<Ctx> => {
  const payload = {roundUuid: getNextRoundUuid(ctx)};
  return {
    current: {...ctx.current, ...payload},
    history: [
      ...ctx.history,
      {type: '#system/setNextRound', self: {teamUuid: '', userUuid: ''}, payload}
    ]
  };
});
