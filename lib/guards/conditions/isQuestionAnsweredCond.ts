import {Ctx} from '../../types';

export type QuestionAnsweredCondData = {
  teamUuid: string;
  questionUuid: string;
};

/**
 *
 * @param ctx
 * @param data
 */
export const isQuestionAnsweredCond = (ctx: Ctx, data: QuestionAnsweredCondData) => {
  return ctx.history.some(
    record =>
      record.type === 'basicTryAnswer' &&
      record.self.teamUuid === data.teamUuid &&
      record.payload.questionUuid === data.questionUuid
  );
};
