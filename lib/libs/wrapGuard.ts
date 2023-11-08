import {Action, Ctx, Guard} from '../types';

/**
 *
 * @param guard
 */
export const wrapGuard = <T extends Action>(guard: Guard<T['payload']>) => {
  return (ctx: Ctx, e: T) => {
    return guard(ctx)(e.self, e.payload);
  };
};
