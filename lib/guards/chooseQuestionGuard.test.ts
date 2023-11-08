import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {chooseQuestionGuard} from './chooseQuestionGuard';

describe('chooseQuestionGuard', () => {
  const {ctx, hostAuth, playerAuth, version, changeCurrent, pushTeamEvent, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return true, если команда может выбрать вопрос', () => {
    changeCurrent({turnTeamUuid: playerAuth.teamUuid});
    expect(
      chooseQuestionGuard(ctx)(playerAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(true);
  });

  it('should return true, если хост выбирает вопрос', () => {
    changeCurrent({turnTeamUuid: playerAuth.teamUuid});
    expect(
      chooseQuestionGuard(ctx)(hostAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(true);
  });

  it('should return false, если у команды нет хода', () => {
    changeCurrent({turnTeamUuid: ctx.teams[2].uuid});
    expect(
      chooseQuestionGuard(ctx)(playerAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(false);
  });

  it('should return false, если вопрос уже был выбран', () => {
    changeCurrent({turnTeamUuid: playerAuth.teamUuid});

    pushTeamEvent(playerAuth.teamUuid, {
      type: 'chooseQuestion',
      payload: {questionUuid: version.questions[0].uuid}
    });

    expect(
      chooseQuestionGuard(ctx)(playerAuth, {questionUuid: version.questions[0].uuid})
    ).toBe(false);
  });
});
