import {TypeBetEvent} from '../events';
import {getAuctionHighestBet} from '../libs';
import {Guard} from '../types';
import {isTeamLeaderCond, isTeamTurnCond, isUserConnectedCond} from './conditions';
import {isPause} from './conds';

/**
 *
 * @param ctx
 */
export const typeBetGuard: Guard<Pick<TypeBetEvent['payload'], 'bet'>> =
  ctx => (auth, payload) => {
    const hasScore = ctx.teams.some(
      team => team.uuid === auth.teamUuid && team.score > 0 && team.score >= payload.bet
    );

    const previousBet = ctx.history
      .filter(
        record =>
          record.type === 'typeBet' &&
          record.payload.questionUuid === ctx.current.questionUuid
      )
      .pop() as TypeBetEvent | undefined;

    const isPreviousBetAllIn =
      ctx.teams.find(team => team.uuid === previousBet?.self.teamUuid)?.score ===
      previousBet?.payload.bet;

    const isCurrentBetAllIn =
      ctx.teams.find(team => team.uuid === auth.teamUuid)?.score === payload.bet;

    // Если был ва-банк, то запрещаем след ставки.
    if (isPreviousBetAllIn && !isCurrentBetAllIn) {
      return false;
    }

    const isBetAboveHighestBet = payload.bet > getAuctionHighestBet(ctx);

    return [
      !isPause(ctx),
      isUserConnectedCond(ctx, {userUuid: auth.userUuid, role: 'PLAYER'}),
      isTeamTurnCond(ctx, {teamUuid: auth.teamUuid}),
      isTeamLeaderCond(ctx, auth),
      hasScore,
      isBetAboveHighestBet || isCurrentBetAllIn
    ].every(Boolean);
  };
