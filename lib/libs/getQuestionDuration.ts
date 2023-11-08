import {Ctx} from '../types';
import {defaultTimers} from '../constants';
import {getPkgVersion} from './getPkgVersion';
import {getStepDuration} from './getStepDuration';

/**
 * Get the duration of the question.
 * @param ctx
 * @returns
 */
export const getQuestionDuration = (ctx: Ctx) => {
  const hasPrePlay = ctx.game?.settings.prePlay;

  const steps =
    getPkgVersion(ctx)?.steps.filter(
      step => step.questionUuid === ctx.current.questionUuid
    ) ?? [];

  const playSteps = steps
    .filter(s => !s.isAnswer)
    .sort((a, b) => a.position - b.position);

  const answerSteps = steps
    .filter(s => s.isAnswer)
    .sort((a, b) => a.position - b.position);

  const playDuration = playSteps.reduce(
    (accumulator, step) =>
      accumulator +
      getStepDuration(step, {
        stage: hasPrePlay ? 'pre-play' : 'play',
        count: playSteps.length
      }),
    0
  );

  const answerDuration = answerSteps.reduce(
    (accumulator, step) =>
      accumulator +
      getStepDuration(step, {
        stage: 'answer',
        count: answerSteps.length
      }),
    0
  );

  return {
    pre: hasPrePlay ? playDuration : 0,
    play: hasPrePlay ? defaultTimers.TRY_STAGE / 2 : playDuration,
    answer: answerDuration
  };
};
