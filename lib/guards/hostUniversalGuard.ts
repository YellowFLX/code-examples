import {Ctx, GuardEmpty} from '../types';
import {isUserConnectedCond} from './conditions';

/**
 *
 * @param ctx
 */
export const hostUniversalGuard: GuardEmpty = (ctx: Ctx) => auth =>
  isUserConnectedCond(ctx, {
    userUuid: auth.userUuid,
    role: 'LEADER'
  });
