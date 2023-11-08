import {PackageQuestionStep} from '@opeq-dev/openquiz-schema';
import {defaultTimers} from '../constants';
import {QuestionStepStage} from '../types';

interface GetStepDurationParams {
  /**
   * Стадия шагов.
   */
  stage: QuestionStepStage;
  /**
   * Количество шагов в стадии.
   */
  count: number;
}

/**
 * Get the duration of the question.
 *
 * Режим чтения:
 *  - Текст: рассчитывается длительность в зависимости от контента.
 *  - Медиа: Используется значение duration.
 *
 * Обычный режим:
 *  - Если `duration === -1`, используется дефолтное значение длительности.
 *  - Если `duration >= -1`, используется кастомная длительность.
 *
 * @param step
 * @param params
 */
export const getStepDuration = (
  {type, payload, duration}: Pick<PackageQuestionStep, 'type' | 'payload' | 'duration'>,
  {stage, count}: GetStepDurationParams
) => {
  // Режим чтения

  if (stage === 'pre-play') {
    switch (type) {
      case 'TEXT':
        return Math.max(
          Math.ceil(payload.trim().split(' ').length * 400),
          defaultTimers.EXTRA
        );
      case 'AUDIO':
      case 'VIDEO':
        return duration * 1000 + defaultTimers.EXTRA;
      case 'IMAGE':
        return defaultTimers.EXTRA;
    }
  }

  // Обычный режим

  if (duration === -1) {
    return stage === 'play'
      ? defaultTimers.PLAY_STAGE / count
      : defaultTimers.ANSWER_STAGE;
  }

  switch (type) {
    case 'AUDIO':
    case 'VIDEO':
      return duration * 1000 + defaultTimers.EXTRA;
    default:
      return duration * 1000;
  }
};
