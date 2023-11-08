import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {getAuctionHighestBet} from './getAuctionHighestBet';

describe('getAuctionHighestBet', () => {
  const {ctx, playerAuth, version, changeCurrent, pushTeamEvent, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  const questionUuid = version.questions[0].uuid;

  it('should return same price, если нет ставок', () => {
    changeCurrent({questionUuid});
    expect(getAuctionHighestBet(ctx)).toBe(version.questions[0].price);
  });

  it('should return самую большую ставку', () => {
    changeCurrent({questionUuid});

    pushTeamEvent(playerAuth.teamUuid, {
      type: 'typeBet',
      payload: {questionUuid, bet: 200}
    });

    pushTeamEvent(ctx.teams[1].uuid, {
      type: 'typeBet',
      payload: {questionUuid, bet: 500}
    });

    pushTeamEvent(ctx.teams[3].uuid, {
      type: 'typeBet',
      payload: {questionUuid, bet: 1500}
    });

    expect(getAuctionHighestBet(ctx)).toBe(1500);
  });
});
