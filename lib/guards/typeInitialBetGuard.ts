import {TypeBetEvent} from '../events';
import {getCurrentQuestion} from '../libs';
import {Guard} from '../types';
import {isTeamLeaderCond, isTeamTurnCond, isUserConnectedCond} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const typeInitialBetGuard: Guard<Pick<TypeBetEvent['payload'], 'bet'>> =
  ctx => (auth, payload) => {
    const team = ctx.teams.find(team => team.uuid === auth.teamUuid);
    const question = getCurrentQuestion(ctx);

    if (!team || !question) {
      return false;
    }

    const _isScopeAboveOrEqualPrice = team?.score >= question.price;

    const isBetAboveOrEqualPrice = _isScopeAboveOrEqualPrice
      ? payload.bet >= question.price
      : payload.bet === question.price;

    return [
      !isPause(ctx),
      isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'PLAYER'}),
      isTeamLeaderCond(ctx, auth),
      isTeamTurnCond(ctx, {teamUuid: auth.teamUuid}),
      isBetAboveOrEqualPrice
    ].every(Boolean);
  };
