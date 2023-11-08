import {assign} from 'xstate';
import {getTeamLeaderUuid} from '../libs';
import {Action, Ctx} from '../types';

/**
 * This action will refuse the bet if the player did not have time to place it.
 */
export const setPlaceBetTimeout = assign<Ctx, Action>(ctx => {
  if (!ctx.current.questionUuid || !ctx.current.turnTeamUuid) {
    return ctx;
  }

  const teamLeaderUuid = getTeamLeaderUuid(ctx, ctx.current.turnTeamUuid);

  if (!teamLeaderUuid) {
    return ctx;
  }

  return {
    history: [
      ...ctx.history,
      {
        type: 'passBet',
        self: {teamUuid: ctx.current.turnTeamUuid, userUuid: teamLeaderUuid},
        payload: {
          questionUuid: ctx.current.questionUuid
        }
      }
    ]
  };
});
