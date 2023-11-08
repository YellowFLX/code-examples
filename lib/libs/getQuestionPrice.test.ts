import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {getQuestionPrice} from './getQuestionPrice';

describe('getQuestionPrice', () => {
  const {ctx, version, reset} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return splash duration for theme', () => {
    expect(getQuestionPrice(ctx, version.questions[0])).toBe(version.questions[0].price);
  });

  it('should return splash duration for played theme', () => {
    expect(getQuestionPrice(ctx, version.questions[6])).toBe(version.questions[6].price);
  });
});
