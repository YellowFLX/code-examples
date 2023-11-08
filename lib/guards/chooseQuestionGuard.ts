import {ChooseQuestionEvent} from '../events';
import {Ctx, Guard} from '../types';
import {
  isQuestionChosenCond,
  isTeamLeaderCond,
  isTeamTurnCond,
  isUserConnectedCond
} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const chooseQuestionGuard: Guard<
  Pick<ChooseQuestionEvent['payload'], 'questionUuid'>
> = (ctx: Ctx) => (auth, payload) => {
  return [
    !isPause(ctx),
    !isQuestionChosenCond(ctx, payload),
    isUserConnectedCond(ctx, auth),
    isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'LEADER'})
      ? true
      : isTeamLeaderCond(ctx, auth) && isTeamTurnCond(ctx, {teamUuid: auth.teamUuid})
  ].every(Boolean);
};
