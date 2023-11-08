import {AUCTION_BETS_TIMER_DURATION, TRY_TIMER_DURATION} from '../../constants';
import {
  resetAllTimersAction,
  setInitialBet,
  setNextBetPlayer,
  setPlaceBetTimeout,
  setTryAnswerTimeout
} from '../../actions';
import {
  acceptAnswerEvent,
  passBetEvent,
  rejectAnswerEvent,
  skipQuestionEvent,
  typeBetEvent
} from '../../events';
import {
  everyTypeBetGuard,
  hostUniversalGuard,
  isTimerEnd,
  passBetGuard,
  skipQuestionGuard,
  typeBetGuard,
  typeInitialBetGuard
} from '../../guards';
import {createTimer, getQuestionDuration, wrapGuard} from '../../libs';
import {StateConfig} from '../../types';
import {basicQuestionState} from './basicQuestionState';

/**
 * State for auction question.
 */
export const auctionQuestionState: StateConfig = {
  initial: 'idle',
  states: {
    idle: {
      entry: resetAllTimersAction,
      always: {target: 'splash'}
    },
    splash: {
      ...createTimer('auctionBets', {
        from: 'splash',
        target: 'bets',
        rewritable: false,
        duration: () => AUCTION_BETS_TIMER_DURATION,
        always: () => [
          {
            target: 'bets',
            cond: isTimerEnd('auctionBets'),
            actions: [setInitialBet, setNextBetPlayer]
          }
        ]
      }),
      on: {
        typeBet: {
          target: 'bets',
          cond: wrapGuard(typeInitialBetGuard),
          actions: [typeBetEvent, setNextBetPlayer]
        }
      }
    },
    bets: {
      ...createTimer('auctionBets', {
        from: 'bets',
        target: 'bets',
        rewritable: true,
        duration: () => AUCTION_BETS_TIMER_DURATION,
        always: () => [
          {
            target: 'bets',
            cond: isTimerEnd('auctionBets'),
            actions: [setPlaceBetTimeout, setNextBetPlayer]
          },
          {
            target: 'play',
            cond: wrapGuard(everyTypeBetGuard)
          }
        ]
      }),
      on: {
        typeBet: {
          target: 'bets',
          cond: wrapGuard(typeBetGuard),
          actions: [typeBetEvent, setNextBetPlayer]
        },
        passBet: {
          target: 'bets',
          cond: wrapGuard(passBetGuard),
          actions: [passBetEvent, setNextBetPlayer]
        }
      }
    },
    play: {
      ...createTimer('play', {
        from: 'play',
        target: 'answer',
        rewritable: false,
        duration: ctx => getQuestionDuration(ctx).play + TRY_TIMER_DURATION,
        always: () => [
          {
            target: 'answer',
            cond: isTimerEnd('play'),
            actions: setTryAnswerTimeout
          }
        ]
      }),
      on: {
        acceptAnswer: {
          target: 'answer',
          cond: wrapGuard(hostUniversalGuard),
          actions: acceptAnswerEvent
        },
        rejectAnswer: {
          target: 'answer',
          cond: wrapGuard(hostUniversalGuard),
          actions: rejectAnswerEvent
        },
        skipQuestion: {
          target: 'answer',
          cond: wrapGuard(skipQuestionGuard),
          actions: [skipQuestionEvent]
        }
      }
    },
    answer: basicQuestionState.states?.answer ?? {},
    end: basicQuestionState.states?.end ?? {}
  }
};
