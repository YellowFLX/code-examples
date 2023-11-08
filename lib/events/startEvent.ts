import {assign} from 'xstate';
import {getPkgVersion} from '../libs';
import {Ctx, MakeEvent} from '../types';

export type StartEvent = MakeEvent<'start', void>;

/**
 *
 */
export const startEvent = assign<Ctx, StartEvent>((ctx, e): Partial<Ctx> => {
  const initialRound = getPkgVersion(ctx)?.rounds[0];

  if (!initialRound) {
    return ctx;
  }

  return {
    current: {
      ...ctx.current,
      roundUuid: initialRound.uuid
    },
    history: [...ctx.history, e]
  };
});
