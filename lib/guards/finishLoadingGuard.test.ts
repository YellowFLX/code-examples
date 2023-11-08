import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {finishLoadingGuard} from './finishLoadingGuard';

describe('finishLoadingGuard', () => {
  const {ctx, playerAuth, version, pushTeamEvent, reset} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return true, если игрок может', () => {
    expect(
      finishLoadingGuard(ctx)(playerAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(true);
  });

  it('should return true, если игрок не может', () => {
    pushTeamEvent(playerAuth.teamUuid, {
      type: 'finishLoading',
      payload: {questionUuid: version.questions[0].uuid}
    });
    expect(
      finishLoadingGuard(ctx)(playerAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(false);
  });
});
