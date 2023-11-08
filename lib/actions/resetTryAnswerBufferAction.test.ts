import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {initialContext} from '../initialContext';
import {resetTryAnswerBufferAction} from './resetTryAnswerBufferAction';

describe('resetTryAnswerBufferAction', () => {
  const {reset} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return пустые таймеры', () => {
    expect(resetTryAnswerBufferAction).toStrictEqual({
      assignment: {tryAnswerBuffer: initialContext.tryAnswerBuffer},
      type: 'xstate.assign'
    });
  });
});
