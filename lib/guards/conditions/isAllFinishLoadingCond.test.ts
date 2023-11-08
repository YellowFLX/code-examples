import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../../mocks/getContextMock';
import {isAllFinishLoadingCond} from './isAllFinishLoadingCond';

describe('isAllFinishLoadingCond', () => {
  const {ctx, pushTeamEvent, changeUsers, changeCurrent, version, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return false, если не все игроки завершили загрузку', () => {
    changeCurrent({questionUuid: version.questions[0].uuid});
    expect(isAllFinishLoadingCond(ctx)).toBe(false);
  });

  it('should return false, если все игроки завершили загрузку', () => {
    changeCurrent({questionUuid: version.questions[0].uuid});
    changeUsers([ctx.users[0]]);

    pushTeamEvent(ctx.users[0].teamUuid as string, {
      type: 'finishLoading',
      payload: {
        questionUuid: version.questions[0].uuid
      }
    });

    expect(isAllFinishLoadingCond(ctx)).toBe(true);
  });
});
