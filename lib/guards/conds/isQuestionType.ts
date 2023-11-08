import {QuestionType} from '@opeq-dev/openquiz-schema';
import {getCurrentQuestion} from '../../libs';
import {Ctx} from '../../types';

/**
 *
 * @param type
 * @returns
 */
export const isQuestionType = (type: QuestionType) => (ctx: Ctx) =>
  getCurrentQuestion(ctx)?.type === type;
