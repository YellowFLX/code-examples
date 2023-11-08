import {BasicTryAnswerEvent} from '../events';
import {Ctx, Guard} from '../types';
import {
  isQuestionAnsweredCond,
  isQuestionPassedCond,
  isUserConnectedCond
} from './conditions';
import {isPause} from './conds';

export const basicTryAnswerGuard: Guard<
  Pick<BasicTryAnswerEvent['payload'], 'questionUuid'>
> = (ctx: Ctx) => (auth, payload) => {
  const isInBuffer = ctx.tryAnswerBuffer.some(
    record => record.teamUuid === auth.teamUuid
  );

  return [
    isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'PLAYER'}),
    !isPause(ctx),
    !isQuestionAnsweredCond(ctx, {
      teamUuid: auth.teamUuid,
      questionUuid: payload.questionUuid
    }),
    !isQuestionPassedCond(ctx, {
      teamUuid: auth.teamUuid,
      questionUuid: payload.questionUuid
    }),
    !isInBuffer
  ].every(Boolean);
};
