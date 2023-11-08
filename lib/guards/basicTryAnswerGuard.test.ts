import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {Ctx} from '../types';
import {basicTryAnswerGuard} from './basicTryAnswerGuard';

describe('basicTryAnswerGuard', () => {
  const {ctx, playerAuth, version, changeCurrent, pushTeamEvent, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return true, если команда может ответить', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid
    });

    expect(
      basicTryAnswerGuard(ctx)(playerAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(true);
  });

  it('should return false, если команда уже отвечала', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid
    });

    pushTeamEvent(playerAuth.teamUuid, {
      type: 'basicTryAnswer',
      payload: {questionUuid: version.questions[0].uuid}
    });

    expect(
      basicTryAnswerGuard(ctx)(playerAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(false);
  });

  it('should return false, если команда пробовала ответить (tryAnswerBuffer)', () => {
    const ctxWithBuffer: Ctx = {
      ...ctx,
      tryAnswerBuffer: [
        {
          teamUuid: playerAuth.teamUuid,
          userUuid: playerAuth.userUuid,
          timestamp: Date.now()
        }
      ]
    };

    expect(
      basicTryAnswerGuard(ctxWithBuffer)(playerAuth, {
        questionUuid: version.questions[0].uuid
      })
    ).toBe(false);
  });
});
