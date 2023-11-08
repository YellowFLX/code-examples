import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {initialContext} from '../initialContext';
import {resetAllTimersAction} from './resetAllTimersAction';

describe('resetAllTimersAction', () => {
  const {reset} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return пустые таймеры', () => {
    expect(resetAllTimersAction).toStrictEqual({
      assignment: {timers: initialContext.timers},
      type: 'xstate.assign'
    });
  });
});
