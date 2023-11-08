import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {getSplashDuration} from './getSplashDuration';

describe('getSplashDuration', () => {
  const {ctx, version, changeCurrent, reset, pushTeamEvent, playerAuth} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return splash duration for theme', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid
    });
    expect(getSplashDuration(ctx)).toBe(2000);
  });

  it('should return splash duration for played theme', () => {
    changeCurrent({
      questionUuid: version.questions[1].uuid
    });

    pushTeamEvent(playerAuth.teamUuid, {
      type: 'chooseQuestion',
      payload: {questionUuid: version.questions[0].uuid}
    });

    expect(getSplashDuration(ctx)).toBe(600);
  });

  it('should return splash duration for theme with description', () => {
    changeCurrent({
      questionUuid: version.questions.at(-1)!.uuid
    });
    expect(getSplashDuration(ctx)).toBe(4000);
  });
});
