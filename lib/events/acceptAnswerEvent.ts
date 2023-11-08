import {assign} from 'xstate';
import {getCurrentQuestion, getQuestionPrice} from '../libs';
import {Ctx, MakeEvent} from '../types';

export type AcceptAnswerEvent = MakeEvent<
  'acceptAnswer',
  {teamUuid: string; questionUuid: string; multiplier: number}
>;

/**
 *
 */
export const acceptAnswerEvent = assign<Ctx, AcceptAnswerEvent>(
  (ctx, e): Partial<Ctx> => {
    const question = getCurrentQuestion(ctx);

    if (!question) {
      return ctx;
    }

    return {
      teams: ctx.teams.map(team => {
        if (team.uuid === ctx.current.turnTeamUuid) {
          return {
            ...team,
            score: team.score + getQuestionPrice(ctx, question) * e.payload.multiplier
          };
        }
        return team;
      }),
      history: [...ctx.history, e]
    };
  }
);
