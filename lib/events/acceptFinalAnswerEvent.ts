import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';
import {TypeBetEvent} from './typeBetEvent';

export type AcceptFinalAnswerEvent = MakeEvent<
  'acceptFinalAnswer',
  {teamUuid: string; multiplier: number}
>;

/**
 *
 */
export const acceptFinalAnswerEvent = assign<Ctx, AcceptFinalAnswerEvent>(
  (ctx, e): Partial<Ctx> => {
    const typedBet = (
      ctx.history.find(
        record =>
          record.type === 'typeFinalBet' && record.self.teamUuid === e.payload.teamUuid
      ) as TypeBetEvent | undefined
    )?.payload.bet;

    if (!typedBet) {
      return ctx;
    }

    return {
      teams: ctx.teams.map(team => {
        if (team.uuid === e.payload.teamUuid) {
          return {...team, score: team.score + typedBet * e.payload.multiplier};
        }
        return team;
      }),
      history: [...ctx.history, e]
    };
  }
);
