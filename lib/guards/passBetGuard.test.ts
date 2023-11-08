import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {passBetGuard} from './passBetGuard';

describe('passBetGuard', () => {
  const {ctx, playerAuth, pushTeamEvent, reset, version, changeCurrent} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return false, если команда не может пасануть ставку (чужой ход)', () => {
    expect(
      passBetGuard(ctx)(playerAuth, {
        questionUuid: version.questions[0].uuid
      })
    ).toBe(false);
  });

  it('should return false, если команда не уже пасанула ставку', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth.teamUuid
    });

    pushTeamEvent(playerAuth.teamUuid, {
      type: 'passBet',
      payload: {
        questionUuid: version.questions[0].uuid
      }
    });

    expect(
      passBetGuard(ctx)(playerAuth, {
        questionUuid: version.questions[0].uuid
      })
    ).toBe(false);
  });

  it('should return false, если команда может пасануть ставку', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth.teamUuid
    });
    expect(
      passBetGuard(ctx)(playerAuth, {
        questionUuid: version.questions[0].uuid
      })
    ).toBe(true);
  });
});
