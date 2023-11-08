import {FinishLoadingEvent} from '../events';
import {Ctx, Guard} from '../types';
import {isUserConnectedCond} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const finishLoadingGuard: Guard<
  Pick<FinishLoadingEvent['payload'], 'questionUuid'>
> = (ctx: Ctx) => (auth, payload) => {
  const isAlreadyFinishLoading = ctx.history.some(
    record =>
      record.type === 'finishLoading' &&
      record.self.userUuid === auth.userUuid &&
      record.payload.questionUuid === payload.questionUuid
  );

  return [
    !isPause(ctx),
    !isAlreadyFinishLoading,
    isUserConnectedCond(ctx, {userUuid: auth.userUuid})
  ].every(Boolean);
};
