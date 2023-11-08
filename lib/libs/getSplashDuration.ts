import {ChooseQuestionEvent} from '../events';
import {splashTimers} from '../constants';
import {Ctx} from '../types';
import {getCurrentQuestion} from './getCurrentQuestion';

/**
 *
 * @param ctx
 */
export const getSplashDuration = (ctx: Ctx) => {
  const currentQuestion = getCurrentQuestion(ctx);
  const questions = ctx.pkg?.versions[0].questions || [];

  const playedThemesUuid = ctx.history
    .filter(record => record.type === 'chooseQuestion')
    .map(record => (record as ChooseQuestionEvent).payload.questionUuid)
    .filter(questionUuid => questionUuid !== currentQuestion?.uuid)
    .map(questionUuid => questions.find(q => q.uuid === questionUuid)!.themeUuid);

  const currentTheme = ctx.pkg?.versions[0].themes.find(
    theme => theme.uuid === currentQuestion?.themeUuid
  );

  if (currentQuestion && !playedThemesUuid.includes(currentQuestion.themeUuid)) {
    return currentTheme?.description ? splashTimers.special : splashTimers.special / 2;
  }

  return splashTimers.basic;
};
