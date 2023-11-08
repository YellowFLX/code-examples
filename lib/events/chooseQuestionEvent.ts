import {assign} from 'xstate';
import {Ctx, MakeEvent} from '../types';

export type ChooseQuestionEvent = MakeEvent<'chooseQuestion', {questionUuid: string}>;

/**
 *
 */
export const chooseQuestionEvent = assign<Ctx, ChooseQuestionEvent>(
  (ctx, e): Partial<Ctx> => {
    return {
      current: {
        ...ctx.current,
        questionUuid: e.payload.questionUuid,
        turnTeamUuid: e.self.teamUuid
      },
      history: [...ctx.history, e]
    };
  }
);
