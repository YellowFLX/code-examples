import {Ctx} from '../../types';

export type TeamTurnCondData = {
  teamUuid: string;
};

/**
 *
 * @param ctx
 * @param data
 */
export const isTeamTurnCond = (ctx: Ctx, data: TeamTurnCondData) =>
  ctx.current.turnTeamUuid === data.teamUuid;
