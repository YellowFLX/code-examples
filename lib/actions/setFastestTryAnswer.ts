import {assign} from 'xstate';
import {Action, Ctx} from '../types';

/**
 * This action is used to set the fastest basicTryAnswer to the current turnTeamUuid.
 **/
export const setFastestTryAnswer = assign<Ctx, Action>((ctx): Partial<Ctx> => {
  const fastestTryAnswer = ctx.tryAnswerBuffer.reduce(
    (min, current) => (min.timestamp > current.timestamp ? current : min),
    ctx.tryAnswerBuffer[0]
  );

  if (!ctx.current.questionUuid) {
    return ctx;
  }

  return {
    current: {
      ...ctx.current,
      turnTeamUuid: fastestTryAnswer.teamUuid
    },
    history: [
      ...ctx.history,
      {
        type: '#system/setFastestTryAnswer',
        self: {teamUuid: fastestTryAnswer.teamUuid, userUuid: fastestTryAnswer.userUuid},
        payload: {
          questionUuid: ctx.current.questionUuid
        }
      }
    ]
  };
});
