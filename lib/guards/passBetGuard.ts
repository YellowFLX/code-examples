import {PassBetEvent} from '../events';
import {Guard} from '../types';
import {isTeamLeaderCond, isTeamTurnCond, isUserConnectedCond} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const passBetGuard: Guard<Pick<PassBetEvent['payload'], 'questionUuid'>> =
  ctx => (auth, payload) => {
    const isPassed = ctx.history.some(
      record =>
        record.type === 'passBet' &&
        record.self.teamUuid === auth.teamUuid &&
        record.payload.questionUuid === payload.questionUuid
    );

    return [
      !isPause(ctx),
      !isPassed,
      isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'PLAYER'}),
      isTeamLeaderCond(ctx, auth),
      isTeamTurnCond(ctx, {teamUuid: auth.teamUuid})
    ].every(Boolean);
  };
