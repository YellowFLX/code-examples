import {assign} from 'xstate';
import {getCurrentQuestion, getQuestionPrice} from '../libs';
import {Ctx, MakeEvent} from '../types';

export type RejectAnswerEvent = MakeEvent<
  'rejectAnswer',
  {teamUuid: string; questionUuid: string}
>;

/**
 *
 */
export const rejectAnswerEvent = assign<Ctx, RejectAnswerEvent>(
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
            score: team.score - getQuestionPrice(ctx, question)
          };
        }
        return team;
      }),
      history: [...ctx.history, e]
    };
  }
);
