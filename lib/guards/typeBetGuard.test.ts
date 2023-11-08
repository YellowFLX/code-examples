import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {typeBetGuard} from './typeBetGuard';

describe('typeBetGuard', () => {
  const {ctx, pushTeamEvent, reset, version, changeCurrent} = getContextMock();

  const playerAuth = {
    teamUuid: ctx.teams[1].uuid,
    userUuid: ctx.teams[1].leaderUuid
  };
  const playerAuth2 = {
    teamUuid: ctx.teams[3].uuid,
    userUuid: ctx.teams[3].leaderUuid
  };

  afterEach(() => {
    reset();
  });

  it('should return false, если команда не может поставить ставку (чужой ход)', () => {
    expect(typeBetGuard(ctx)(playerAuth, {bet: 100})).toBe(false);
  });

  it('should return false, если команда не может поставить ставку (не хватает очков)', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth.teamUuid
    });

    // initial bet
    pushTeamEvent(playerAuth.teamUuid, {
      type: 'typeBet',
      payload: {
        questionUuid: version.questions[0].uuid,
        bet: 100
      }
    });

    expect(typeBetGuard(ctx)(playerAuth, {bet: 100})).toBe(false);
  });

  it('should return false, если команда не может поставить ставку (не ва-банк)', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth2.teamUuid
    });

    // initial bet
    pushTeamEvent(playerAuth.teamUuid, {
      type: 'typeBet',
      payload: {
        questionUuid: version.questions[0].uuid,
        bet: 1000
      }
    });

    expect(typeBetGuard(ctx)(playerAuth2, {bet: 2000})).toBe(false);
  });

  it('should return true, если команда может поставить ставку', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth2.teamUuid
    });

    // initial bet
    pushTeamEvent(playerAuth.teamUuid, {
      type: 'typeBet',
      payload: {
        questionUuid: version.questions[0].uuid,
        bet: 100
      }
    });

    expect(typeBetGuard(ctx)(playerAuth2, {bet: 1000})).toBe(true);
  });
});
