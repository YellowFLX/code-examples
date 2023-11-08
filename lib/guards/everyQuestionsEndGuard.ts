import {getPkgVersion} from '../libs';
import {GuardEmpty} from '../types';

/**
 *
 * @param ctx
 */
export const everyQuestionsEndGuard: GuardEmpty = ctx => () => {
  const version = getPkgVersion(ctx);

  const themesUuid =
    version?.themes.filter(t => t.roundUuid === ctx.current.roundUuid).map(t => t.uuid) ??
    [];

  const questionsUuid =
    version?.questions.filter(q => themesUuid.includes(q.themeUuid)).map(t => t.uuid) ??
    [];

  return questionsUuid.every(questionUuid =>
    ctx.history.some(
      record =>
        record.type === 'chooseQuestion' && record.payload.questionUuid === questionUuid
    )
  );
};
