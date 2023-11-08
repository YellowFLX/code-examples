import {Ctx} from '../../types';

/**
 * Check if the splash screen has already been shown.
 * @param ctx
 */
export const alreadyBeenShownSplash = (ctx: Ctx) => {
  return ctx.history.some(
    r =>
      r.type === '#system/setShownRoundSplash' &&
      r.payload.roundUuid === ctx.current.roundUuid
  );
};
