import {Ctx} from '../types';

/**
 *
 * @param ctx
 * @param assignment
 * @returns
 */
export const makeCtx = (ctx: Ctx, assignment: Partial<Ctx> = {}): Ctx => {
  return {
    ...ctx,
    ...assignment
  };
};
