import {Ctx} from '../types';
import {getPkgVersion} from './getPkgVersion';

/**
 *
 * @param ctx
 * @returns
 */
export const getCurrentRound = (ctx: Ctx) => {
  const version = getPkgVersion(ctx);
  return version?.rounds.find(q => q.uuid === ctx.current.roundUuid);
};
