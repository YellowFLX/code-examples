import {Ctx} from '../types';
import {getPkgVersion} from './getPkgVersion';

/**
 *
 * @param ctx
 * @returns
 */
export const getCurrentQuestion = (ctx: Ctx) => {
  const version = getPkgVersion(ctx);
  return version?.questions.find(q => q.uuid === ctx.current.questionUuid);
};
