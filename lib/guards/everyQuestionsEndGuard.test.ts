import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {everyQuestionsEndGuard} from './everyQuestionsEndGuard';

describe('everyQuestionsEndGuard', () => {
  const {ctx, hostAuth, playerAuth, version, changeCurrent, pushTeamEvent, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return true, если закончились все вопросы', () => {
    changeCurrent({roundUuid: version.rounds[0].uuid});

    version.questions
      .filter(
        question =>
          question.themeUuid ===
          version.themes.find(theme => theme.roundUuid === ctx.current.roundUuid)?.uuid
      )
      .map(question => {
        pushTeamEvent(playerAuth.teamUuid, {
          type: 'chooseQuestion',
          payload: {questionUuid: question.uuid}
        });
      });

    expect(everyQuestionsEndGuard(ctx)(hostAuth)).toBe(true);
  });

  it('should return false, если не все вопросы закончились', () => {
    changeCurrent({roundUuid: version.rounds[0].uuid});
    expect(everyQuestionsEndGuard(ctx)(hostAuth)).toBe(false);
  });
});
