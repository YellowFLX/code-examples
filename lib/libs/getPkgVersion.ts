import {Ctx} from '../types';

/**
 *
 * @param ctx
 * @returns
 */
export const getPkgVersion = (ctx: Ctx) => {
  return ctx.pkg?.versions[0];
};
