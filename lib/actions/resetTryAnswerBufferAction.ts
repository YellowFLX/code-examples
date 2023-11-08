import {assign} from 'xstate';
import {initialContext} from '../initialContext';
import {Ctx} from '../types';

/**
 * This action is used to reset tryAnswerBuffer.
 */
export const resetTryAnswerBufferAction = assign<Ctx>({
  tryAnswerBuffer: initialContext.tryAnswerBuffer
});
