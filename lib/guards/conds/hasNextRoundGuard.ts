import {getNextRoundUuid} from '../../libs';
import {Ctx} from '../../types';

/**
 *
 * @param ctx
 * @returns
 */
export const hasNextRoundGuard = (ctx: Ctx) => !!getNextRoundUuid(ctx);
