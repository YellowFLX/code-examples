import {assign} from 'xstate';
import {Ctx, SystemSetShownRoundSplash} from '../types';

/**
 * Set the round shown splash.
 */
export const setShownRoundSplash = assign<Ctx, SystemSetShownRoundSplash>(
  (ctx): Partial<Ctx> => {
    if (!ctx.current.roundUuid) {
      return ctx;
    }

    const payload = {roundUuid: ctx.current.roundUuid};

    if (
      ctx.history.some(
        r =>
          r.type === '#system/setShownRoundSplash' &&
          r.payload.roundUuid === payload.roundUuid
      )
    ) {
      return ctx;
    }

    return {
      current: {...ctx.current, ...payload},
      history: [
        ...ctx.history,
        {type: '#system/setShownRoundSplash', self: {teamUuid: '', userUuid: ''}, payload}
      ]
    };
  }
);
