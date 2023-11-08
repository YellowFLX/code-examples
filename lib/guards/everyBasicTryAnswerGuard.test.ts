import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock, getFakeUser} from '../mocks/getContextMock';
import {everyBasicTryAnswerGuard} from './everyBasicTryAnswerGuard';

describe('everyBasicTryAnswerGuard', () => {
  const {ctx, hostAuth, version, changeUsers, changeCurrent, pushTeamEvent, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return true if everyone tried to answer the question', () => {
    changeCurrent({
      roundUuid: version.rounds[0].uuid,
      questionUuid: version.questions[0].uuid
    });

    ctx.teams.forEach(team => {
      pushTeamEvent(team.uuid, {
        type: 'basicTryAnswer',
        payload: {questionUuid: ctx.current.questionUuid as string}
      });
    });

    expect(everyBasicTryAnswerGuard(ctx)(hostAuth)).toBe(true);
  });

  it('should return true, если игроки пасанули', () => {
    changeCurrent({
      roundUuid: version.rounds[0].uuid,
      questionUuid: version.questions[0].uuid
    });

    ctx.teams.forEach(team => {
      pushTeamEvent(team.uuid, {
        type: 'passTryAnswer',
        payload: {questionUuid: ctx.current.questionUuid as string}
      });
    });

    expect(everyBasicTryAnswerGuard(ctx)(hostAuth)).toBe(true);
  });

  it('should return false if not everyone tried to answer the question', () => {
    changeCurrent({
      roundUuid: version.rounds[0].uuid,
      questionUuid: version.questions[0].uuid
    });

    ctx.teams.slice(0, -1).forEach(team => {
      pushTeamEvent(team.uuid, {
        type: 'basicTryAnswer',
        payload: {questionUuid: ctx.current.questionUuid as string}
      });
    });

    expect(everyBasicTryAnswerGuard(ctx)(hostAuth)).toBe(false);
  });

  it('should return false, если в лобби только лидер', () => {
    changeUsers([getFakeUser({role: 'LEADER', teamUuid: null})]);

    changeCurrent({
      roundUuid: version.rounds[0].uuid,
      questionUuid: version.questions[0].uuid
    });

    expect(everyBasicTryAnswerGuard(ctx)(hostAuth)).toBe(false);
  });
});
