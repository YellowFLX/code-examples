import {Ctx} from '../../types';

export type QuestionPassedCondData = {
  teamUuid: string;
  questionUuid: string;
};

/**
 *
 * @param ctx
 * @param data
 */
export const isQuestionPassedCond = (ctx: Ctx, data: QuestionPassedCondData) => {
  return ctx.history.some(
    record =>
      record.type === 'passTryAnswer' &&
      record.self.teamUuid === data.teamUuid &&
      record.payload.questionUuid === data.questionUuid
  );
};
