import {Ctx, UserRole} from '../../types';

export type UserConnectedCondData = {
  userUuid: string;
  role?: UserRole;
};

/**
 *
 * @param ctx
 * @param data
 */
export const isUserConnectedCond = (ctx: Ctx, data: UserConnectedCondData) =>
  ctx.users
    .filter(user => (data.role ? user.role === data.role : true))
    .some(user => user.uuid === data.userUuid);
