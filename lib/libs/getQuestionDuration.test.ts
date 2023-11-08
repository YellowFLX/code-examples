import {describe, expect, it} from 'vitest';
import {initialContext} from '../initialContext';
import {pkgMock} from '../mocks/pkgMock';
import {Ctx} from '../types';
import {getQuestionDuration} from './getQuestionDuration';

const initialTestContext: Ctx = {
  ...initialContext,
  pkg: pkgMock
};

describe('getQuestionDuration', () => {
  it('should return default values', () => {
    expect(getQuestionDuration(initialTestContext)).toStrictEqual({
      pre: 0,
      play: 0,
      answer: 0
    });
  });

  it('should return default values if empty pkg', () => {
    expect(
      getQuestionDuration({
        ...initialTestContext,
        pkg: null
      })
    ).toStrictEqual({
      pre: 0,
      play: 0,
      answer: 0
    });
  });

  it('should return correct values', () => {
    expect(
      getQuestionDuration({
        ...initialTestContext,
        current: {
          ...initialTestContext.current,
          questionUuid: '9121945b-cd64-4565-a2a5-d72b395f2ebf'
        }
      })
    ).toStrictEqual({
      pre: 0,
      play: 33000,
      answer: 42300
    });
  });
});
