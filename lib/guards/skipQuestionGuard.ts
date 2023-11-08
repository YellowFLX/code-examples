import {GuardEmpty} from '../types';
import {isUserConnectedCond} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const skipQuestionGuard: GuardEmpty = ctx => auth => {
  return [
    !isPause(ctx),
    isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'LEADER'})
  ].every(Boolean);
};
