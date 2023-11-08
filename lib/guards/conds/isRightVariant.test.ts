import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../../mocks/getContextMock';
import {isRightVariant} from './isRightVariant';

describe('isRightVariant', () => {
  const {ctx, playerAuth, version, changeCurrent, pushTeamEvent, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return false, если выбран правильный вариант', () => {
    changeCurrent({questionUuid: version.questions[0].uuid});
    pushTeamEvent(playerAuth.teamUuid, {
      type: 'chooseVariant',
      payload: {questionUuid: version.questions[0].uuid, variant: '1'}
    });

    expect(isRightVariant(ctx)).toBe(true);
  });

  it('should return false, если выбран не правильный вариант', () => {
    changeCurrent({questionUuid: version.questions[0].uuid});
    pushTeamEvent(ctx.teams[1].uuid, {
      type: 'chooseVariant',
      payload: {questionUuid: version.questions[0].uuid, variant: '0'}
    });

    expect(isRightVariant(ctx)).toBe(false);
  });
});
