import {assign} from 'xstate';
import {getCurrentQuestion, getTeamLeaderUuid} from '../libs';
import {Action, Ctx} from '../types';

/**
 * This action will set the initial bid, it is equal to the price of the question.
 */
export const setInitialBet = assign<Ctx, Action>(ctx => {
  const question = getCurrentQuestion(ctx);

  if (!question || !ctx.current.questionUuid || !ctx.current.turnTeamUuid) {
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
        type: 'typeBet',
        self: {teamUuid: ctx.current.turnTeamUuid, userUuid: teamLeaderUuid},
        payload: {
          questionUuid: ctx.current.questionUuid,
          bet: question.price
        }
      }
    ]
  };
});
