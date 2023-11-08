import {TypeBetEvent} from 'src/events';
import {Ctx} from '../types';
import {getAuctionHighestBet} from './getAuctionHighestBet';

/**
 * This method return the next bet turn `playerUuid`.
 * @param ctx
 */
export const getNextBetTurnUuid = (ctx: Ctx) => {
  const highestBet = getAuctionHighestBet(ctx);

  const canBetTeams = ctx.teams
    .filter(team => team.score > highestBet)
    .filter(
      team =>
        !ctx.history.some(
          record =>
            record.type === 'passBet' &&
            record.self.teamUuid === team.uuid &&
            record.payload.questionUuid === ctx.current.questionUuid
        )
    )
    .sort((a, b) => b.score - a.score);

  const lastBetTeam = ctx.history
    .filter(
      record =>
        record.type === 'typeBet' &&
        record.payload.questionUuid === ctx.current.questionUuid
    )
    .pop() as TypeBetEvent | undefined;

  const currentTurnTeamIndex = canBetTeams.findIndex(
    team => team.uuid === ctx.current.turnTeamUuid
  );

  const nextTurnUserUuid =
    currentTurnTeamIndex > 0
      ? canBetTeams[currentTurnTeamIndex - 1]?.uuid
      : canBetTeams.pop()?.uuid;

  return nextTurnUserUuid ?? lastBetTeam?.self.teamUuid ?? ctx.current.turnTeamUuid;
};
