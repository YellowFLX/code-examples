import {assign} from 'xstate';
import {Action, Ctx} from '../types';
import {getAuctionHighestBet, getCurrentQuestion} from '../libs';

/**
 * This action will deduct points if the player did not have time to answer the question.
 */
export const setTryAnswerTimeout = assign<Ctx, Action>(ctx => {
  const question = getCurrentQuestion(ctx);

  if (!question) return ctx;

  const price = question.type === 'AUCTION' ? getAuctionHighestBet(ctx) : question.price;

  return {
    teams: ctx.teams.map(team => {
      if (team.uuid === ctx.current.turnTeamUuid) {
        return {...team, score: team.score - price};
      }
      return team;
    }),
    history: [
      ...ctx.history,
      {
        type: '#system/setTryAnswerTimeout',
        self: {userUuid: '', teamUuid: ''},
        payload: {
          teamUuid: ctx.current.turnTeamUuid || '',
          questionUuid: ctx.current.questionUuid || ''
        }
      }
    ]
  };
});
