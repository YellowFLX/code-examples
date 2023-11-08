import {Ctx} from '../../types';

/**
 *
 * @param ctx
 */
export const isAllFinishLoadingCond = (ctx: Ctx) => {
  return ctx.users.every(user =>
    ctx.history.some(
      r =>
        r.type === 'finishLoading' &&
        r.self.userUuid === user.uuid &&
        r.payload.questionUuid === ctx.current.questionUuid
    )
  );
};
