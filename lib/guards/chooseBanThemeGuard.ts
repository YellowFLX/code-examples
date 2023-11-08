import {ChooseBanThemeEvent} from '../events';
import {Guard} from '../types';
import {isTeamLeaderCond, isTeamTurnCond, isUserConnectedCond} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const chooseBanThemeGuard: Guard<
  Pick<ChooseBanThemeEvent['payload'], 'themeUuid'>
> = ctx => (auth, payload) => {
  const isChosenBan = ctx.history.some(
    record =>
      record.type === 'chooseBanTheme' && record.payload.themeUuid === payload.themeUuid
  );

  return [
    !isPause(ctx),
    !isChosenBan,
    isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'PLAYER'}),
    isTeamTurnCond(ctx, {teamUuid: auth.teamUuid}),
    isTeamLeaderCond(ctx, auth)
  ].every(Boolean);
};
