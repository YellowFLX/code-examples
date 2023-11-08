import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {getNextBetTurnUuid} from './getNextBetTurnUuid';

describe('getNextBetTurnUuid', () => {
  const {ctx, playerAuth, version, changeTeams, changeCurrent, pushTeamEvent, reset} =
    getContextMock();

  afterEach(() => {
    reset();
  });

  it('должен вернуть следующего игрока (если у всех хватает очков)', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: ctx.teams[0].uuid
    });

    expect(getNextBetTurnUuid(ctx)).toBe(ctx.teams[1].uuid);
    changeCurrent({turnTeamUuid: ctx.teams[1].uuid});
    // тут скипается команда без очков
    expect(getNextBetTurnUuid(ctx)).toBe(ctx.teams[3].uuid);
  });

  it('должен вернуть следующею команду (исключая тех кто пасанул)', () => {
    changeCurrent({
      questionUuid: version.questions[0].uuid,
      turnTeamUuid: playerAuth.teamUuid
    });

    pushTeamEvent(playerAuth.teamUuid, {
      type: 'typeBet',
      payload: {questionUuid: ctx.current.questionUuid as string, bet: 150}
    });

    changeCurrent({turnTeamUuid: ctx.teams[1].uuid});
    pushTeamEvent(ctx.teams[1].uuid, {
      type: 'typeBet',
      payload: {questionUuid: ctx.current.questionUuid as string, bet: 250}
    });

    expect(getNextBetTurnUuid(ctx)).toBe(ctx.teams[3].uuid);

    changeCurrent({turnTeamUuid: ctx.teams[3].uuid});
    pushTeamEvent(ctx.teams[3].uuid, {
      type: 'passBet',
      payload: {questionUuid: ctx.current.questionUuid as string}
    });

    expect(getNextBetTurnUuid(ctx)).toBe(ctx.teams[1].uuid);
  });

  it('должен вернуть текущего игрока, если у всех команд не хватает очков', () => {
    changeCurrent({questionUuid: version.questions[0].uuid});

    changeTeams(
      ctx.teams.map((team, index) => ({
        ...team,
        score: index
      }))
    );

    ctx.teams.forEach(team => {
      changeCurrent({turnTeamUuid: team.uuid});
      expect(getNextBetTurnUuid(ctx)).toBe(team.uuid);
    });
  });
});
