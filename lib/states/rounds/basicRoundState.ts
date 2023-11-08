import {
  resetAllTimersAction,
  setShownRoundSplash,
  setSystemEndQuestion
} from '../../actions';
import {chooseQuestionEvent} from '../../events';
import {
  alreadyBeenShownSplash,
  chooseQuestionGuard,
  everyQuestionsEndGuard,
  isQuestionType,
  skipRoundGuard
} from '../../guards';
import {SPLASH_TIMER_DURATION} from '../../constants';
import {createTimer, wrapGuard} from '../../libs';
import {StateConfig} from '../../types';
import {
  auctionQuestionState,
} from '../questions';

export const basicRoundState: StateConfig = {
  initial: 'idle',
  states: {
    idle: {
      entry: resetAllTimersAction,
      always: {target: 'splash'}
    },
    splash: {
      ...createTimer('splash', {
        from: 'splash',
        target: 'choose',
        rewritable: false,
        duration: () => SPLASH_TIMER_DURATION,
        always: deps => [...deps, {target: 'choose', cond: alreadyBeenShownSplash}]
      })
    },
    choose: {
      entry: setShownRoundSplash,
      on: {
        chooseQuestion: {
          target: 'fetch',
          cond: wrapGuard(chooseQuestionGuard),
          actions: chooseQuestionEvent
        },
        skipRound: {
          target: 'end',
          cond: wrapGuard(skipRoundGuard)
        }
      }
    },
    fetch: {
      always: [
        {
          target: 'basicQuestion',
          cond: isQuestionType('BASIC')
        },
        {
          target: 'auctionQuestion',
          cond: isQuestionType('AUCTION')
        }
      ]
    },
    auctionQuestion: {
      ...auctionQuestionState,
      onDone: 'done'
    },
    done: {
      entry: setSystemEndQuestion,
      always: [
        {
          target: 'end',
          cond: wrapGuard(everyQuestionsEndGuard)
        },
        {
          target: 'idle'
        }
      ]
    },
    end: {
      type: 'final'
    }
  }
};
