import {Ctx} from '../../types';

export type TeamLeaderCondData = {
  userUuid: string;
  teamUuid: string;
};

/**
 *
 * @param ctx
 * @param data
 */
export const isTeamLeaderCond = (ctx: Ctx, data: TeamLeaderCondData) => {
  return ctx.teams.some(
    team => team.uuid === data.teamUuid && team.leaderUuid === data.userUuid
  );
};
