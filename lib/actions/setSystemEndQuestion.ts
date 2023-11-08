import {assign} from 'xstate';
import {Action, Ctx} from '../types';

/**
 * This action is used to end the question.
 */
export const setSystemEndQuestion = assign<Ctx, Action>(
  (ctx): Partial<Ctx> => ({
    current: {...ctx.current, questionUuid: null},
    history: [
      ...ctx.history,
      {
        type: '#system/setEndQuestion',
        self: {teamUuid: '', userUuid: ''},
        payload: undefined
      }
    ]
  })
);
