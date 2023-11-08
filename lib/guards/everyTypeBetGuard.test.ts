import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {everyTypeBetGuard} from './everyTypeBetGuard';

describe('everyTypeBetGuard', () => {
  const {ctx, hostAuth, version, changeCurrent, pushTeamEvent, reset} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return true if all bets are typed', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: ctx.teams[0].uuid
    });

    pushTeamEvent(ctx.teams[1].uuid, {
      type: 'typeBet',
      payload: {questionUuid: ctx.current.questionUuid as string, bet: ctx.teams[1].score}
    });

    pushTeamEvent(ctx.teams[3].uuid, {
      type: 'typeBet',
      payload: {questionUuid: ctx.current.questionUuid as string, bet: ctx.teams[3].score}
    });

    pushTeamEvent(ctx.teams[4].uuid, {
      type: 'typeBet',
      payload: {questionUuid: ctx.current.questionUuid as string, bet: ctx.teams[4].score}
    });

    expect(everyTypeBetGuard(ctx)(hostAuth)).toBe(true);
  });

  it('should return true if the other players pressed pass', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: ctx.teams[0].uuid
    });

    pushTeamEvent(ctx.teams[1].uuid, {
      type: 'typeBet',
      payload: {questionUuid: ctx.current.questionUuid as string, bet: ctx.teams[1].score}
    });

    pushTeamEvent(ctx.teams[3].uuid, {
      type: 'typeBet',
      payload: {questionUuid: ctx.current.questionUuid as string, bet: ctx.teams[3].score}
    });

    pushTeamEvent(ctx.teams[4].uuid, {
      type: 'passBet',
      payload: {questionUuid: ctx.current.questionUuid as string}
    });

    expect(everyTypeBetGuard(ctx)(hostAuth)).toBe(true);
  });

  it('should return false if not all bets have been placed yet', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: ctx.teams[0].uuid
    });

    expect(everyTypeBetGuard(ctx)(hostAuth)).toBe(false);

    ctx.teams.slice(0, -1).forEach(team => {
      pushTeamEvent(team.uuid, {
        type: 'typeBet',
        payload: {questionUuid: ctx.current.questionUuid as string, bet: 200}
      });
    });

    expect(everyTypeBetGuard(ctx)(hostAuth)).toBe(false);
  });
});
