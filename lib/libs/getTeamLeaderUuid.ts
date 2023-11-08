import {Ctx} from '../types';

/**
 *
 * @param ctx
 * @param teamUuid
 */
export const getTeamLeaderUuid = (ctx: Ctx, teamUuid: string) => {
  const team = ctx.teams.find(team => team.uuid === teamUuid);
  return team?.leaderUuid;
};
