import {TypeBetEvent} from '../events';
import {getAuctionHighestBet} from '../libs';
import {Ctx, GuardEmpty, TeamRecord} from '../types';

// TODO: mote ot conditions
const hasPassBet = (ctx: Ctx, team: TeamRecord) =>
  ctx.history.some(
    record =>
      record.type === 'passBet' &&
      record.self.teamUuid === team.uuid &&
      record.payload.questionUuid === ctx.current.questionUuid
  );

/**
 * Все игроки поставили ставки или нажали пасс.
 *
 * Если текущая ставка больше чем очки всех игроков (которые не нажали pass),
 * кроме одного, то этот игрок выйграл аукцион.
 *
 * @param ctx
 */
export const everyTypeBetGuard: GuardEmpty = (ctx: Ctx) => () => {
  const highestBet = getAuctionHighestBet(ctx);

  const highestBetAction = ctx.history.find(
    record =>
      record.type === 'typeBet' &&
      record.payload.questionUuid === ctx.current.questionUuid &&
      record.payload.bet === highestBet
  ) as TypeBetEvent | undefined;

  const teams = ctx.teams
    .filter(team => team.score > highestBet)
    .filter(team => highestBetAction?.self.teamUuid !== team.uuid)
    .filter(team => !hasPassBet(ctx, team));

  return teams.length === 0;
};
