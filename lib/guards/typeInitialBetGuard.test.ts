import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {typeInitialBetGuard} from './typeInitialBetGuard';

describe('typeInitialBetGuard', () => {
  const {ctx, playerAuth, reset, version, changeCurrent} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return false, если команда не может поставить ставку (чужой ход)', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: ctx.teams[1].uuid
    });
    expect(typeInitialBetGuard(ctx)(playerAuth, {bet: 100})).toBe(false);
  });

  it('should return false, если команда не может поставить ставку (не хватает очков)', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth.teamUuid
    });
    expect(typeInitialBetGuard(ctx)(playerAuth, {bet: 10000})).toBe(false);
  });

  it('should return false, если команда не может поставить ставку (меньше цены вопроса)', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth.teamUuid
    });
    expect(typeInitialBetGuard(ctx)(playerAuth, {bet: 10})).toBe(false);
  });
});
