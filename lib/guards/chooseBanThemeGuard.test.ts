import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {chooseBanThemeGuard} from './chooseBanThemeGuard';

describe('chooseBanThemeGuard', () => {
  const {ctx, version, changeCurrent, pushTeamEvent, reset} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return true, если команда может забанить тему', () => {
    changeCurrent({
      roundUuid: version.rounds[0].uuid,
      turnTeamUuid: ctx.teams[0].uuid
    });

    const themes = version.themes.filter(
      theme => theme.roundUuid === ctx.current.roundUuid
    );

    expect(
      chooseBanThemeGuard(ctx)(
        {teamUuid: ctx.users[0].teamUuid as string, userUuid: ctx.users[0].uuid},
        {themeUuid: themes[0].uuid}
      )
    ).toBe(true);

    expect(
      chooseBanThemeGuard(ctx)(
        {teamUuid: ctx.users[0].teamUuid as string, userUuid: ctx.users[0].uuid},
        {themeUuid: themes[1].uuid}
      )
    ).toBe(true);
  });

  it('should return false, если команда не может забанить тему', () => {
    changeCurrent({
      roundUuid: version.rounds[0].uuid,
      turnTeamUuid: ctx.teams[0].uuid
    });

    const themes = version.themes.filter(
      theme => theme.roundUuid === ctx.current.roundUuid
    );

    pushTeamEvent(ctx.teams[0].uuid, {
      type: 'chooseBanTheme',
      payload: {themeUuid: themes[0].uuid}
    });

    expect(
      chooseBanThemeGuard(ctx)(
        {teamUuid: ctx.users[0].teamUuid as string, userUuid: ctx.users[0].uuid},
        {themeUuid: themes[0].uuid}
      )
    ).toBe(false);
  });

  it('should return false, если не очередь команды', () => {
    changeCurrent({
      roundUuid: version.rounds[0].uuid,
      turnTeamUuid: ctx.teams[0].uuid
    });

    const themes = version.themes.filter(
      theme => theme.roundUuid === ctx.current.roundUuid
    );

    expect(
      chooseBanThemeGuard(ctx)(
        {teamUuid: ctx.users[1].teamUuid as string, userUuid: ctx.users[1].uuid},
        {themeUuid: themes[0].uuid}
      )
    ).toBe(false);
  });
});
