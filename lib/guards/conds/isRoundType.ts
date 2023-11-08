import {RoundType} from '@opeq-dev/openquiz-schema';
import {getCurrentRound} from '../../libs';
import {Ctx} from '../../types';

/**
 *
 * @param type
 * @returns
 */
export const isRoundType = (type: RoundType) => (ctx: Ctx) =>
  getCurrentRound(ctx)?.type === type;
