import {assign} from 'xstate';
import {ChooseQuestionEvent} from '../events';
import {Action, Ctx} from '../types';

/**
 * This action will set turnTeamUuid for the next turn.
 */
export const setExTurnUserUuid = assign<Ctx, Action>(ctx => {
  const records = ctx.history.filter(record => record.type === 'chooseQuestion');

  if (!records.length) {
    return ctx;
  }

  const chosenQuestionTeamUuid = (records[records.length - 1] as ChooseQuestionEvent).self
    .teamUuid;

  return {
    current: {
      ...ctx.current,
      turnTeamUuid: chosenQuestionTeamUuid || null
    }
  };
});
