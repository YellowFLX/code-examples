import {PackageQuestion} from '@opeq-dev/openquiz-schema';
import {Ctx} from '../types';
import {getAuctionHighestBet} from './getAuctionHighestBet';

/**
 *
 * @param ctx
 * @param question
 */
export const getQuestionPrice = (ctx: Ctx, question: PackageQuestion) =>
  question.type === 'AUCTION' ? getAuctionHighestBet(ctx) : question.price;
