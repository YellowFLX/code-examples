import {assign} from 'xstate';
import {getNextBetTurnUuid} from '../libs/getNextBetTurnUuid';
import {Action, Ctx} from '../types';

/**
 * This method is used to set next player who will choose ban theme.
 */
export const setNextBetPlayer = assign<Ctx, Action>(
  (ctx): Partial<Ctx> => ({
    current: {
      ...ctx.current,
      turnTeamUuid: getNextBetTurnUuid(ctx)
    }
  })
);
