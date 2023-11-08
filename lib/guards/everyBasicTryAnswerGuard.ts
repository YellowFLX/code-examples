import {GuardEmpty} from '../types';

/**
 *
 * @param ctx
 */
export const everyBasicTryAnswerGuard: GuardEmpty = ctx => () => {
  // If there is no players, return false (to allow test packages)
  if (ctx.users.every(user => user.role !== 'PLAYER')) {
    return false;
  }

  return ctx.teams.every(
    team =>
      ctx.history.some(
        record =>
          record.type === 'basicTryAnswer' &&
          record.self.teamUuid === team.uuid &&
          record.payload.questionUuid === ctx.current.questionUuid
      ) ||
      ctx.history.some(
        record =>
          record.type === 'passTryAnswer' &&
          record.self.teamUuid === team.uuid &&
          record.payload.questionUuid === ctx.current.questionUuid
      )
  );
};
