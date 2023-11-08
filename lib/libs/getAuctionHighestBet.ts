import {TypeBetEvent} from '../events';
import {Ctx} from '../types';
import {getPkgVersion} from './getPkgVersion';

/**
 * @param ctx
 * @returns
 */
export const getAuctionHighestBet = (ctx: Ctx) => {
  const version = getPkgVersion(ctx);

  const question = version?.questions.find(q => q.uuid === ctx.current.questionUuid);

  if (!question) {
    return 0;
  }

  return (
    ctx.history.filter(
      record =>
        record.type === 'typeBet' &&
        record.payload.questionUuid === ctx.current.questionUuid
    ) as TypeBetEvent[]
  ).reduce((max, current) => Math.max(max, current.payload.bet), question.price);
};
