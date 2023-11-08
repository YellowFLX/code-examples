import {Ctx} from '../types';
import {getPkgVersion} from './getPkgVersion';

/**
 *
 * @param ctx
 */
export const getNextRoundUuid = (ctx: Ctx): string | null => {
  const version = getPkgVersion(ctx);

  const currentRoundIndex =
    version?.rounds.findIndex(r => r.uuid === ctx.current.roundUuid) ?? -1;

  if (currentRoundIndex === -1) {
    return null;
  }

  return version?.rounds[currentRoundIndex + 1]?.uuid ?? null;
};
