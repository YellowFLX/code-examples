import {GuardEmpty} from '../types';
import {isUserConnectedCond} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const skipRoundGuard: GuardEmpty = ctx => auth => {
  // TODO: добавить проверку, есть ли еще раунд
  return [
    !isPause(ctx),
    isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'LEADER'})
  ].every(Boolean);
};
