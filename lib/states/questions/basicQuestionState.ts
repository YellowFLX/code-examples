import {TRY_ANSWER_BUFFER_DURATION, TRY_TIMER_DURATION} from '../../constants';
import {
  resetAllTimersAction,
  resetTryAnswerBufferAction,
  setExTurnUserUuid,
  setFastestTryAnswer,
  setTryAnswerTimeout
} from '../../actions';
import {
  basicTryAnswerGuard,
  everyBasicTryAnswerGuard,
  finishLoadingGuard,
  hostUniversalGuard,
  isAllFinishLoadingCond,
  isTimerEnd,
  skipQuestionGuard
} from '../../guards';
import {createTimer, getQuestionDuration, getSplashDuration, wrapGuard} from '../../libs';
import {StateConfig} from '../../types';
import {
  acceptAnswerEvent,
  basicTryAnswerEvent,
  finishLoadingEvent,
  passTryAnswerEvent,
  rejectAnswerEvent,
  skipQuestionEvent
} from '../../events';

export const basicQuestionState: StateConfig = {
  initial: 'idle',
  states: {
    idle: {
      entry: [resetAllTimersAction, resetTryAnswerBufferAction],
      always: {target: 'splash'}
    },
    splash: {
      ...createTimer('splash', {
        from: 'splash',
        target: 'loading',
        rewritable: false,
        duration: getSplashDuration
      })
    },
    loading: {
      ...createTimer('loading', {
        from: 'loading',
        target: 'prePlay',
        rewritable: false,
        duration: () => 2000,
        always: deps => [
          ...deps,
          {
            target: 'prePlay',
            cond: isAllFinishLoadingCond
          }
        ]
      }),
      on: {
        finishLoading: {
          cond: wrapGuard(finishLoadingGuard),
          actions: finishLoadingEvent
        },
        skipQuestion: {
          target: 'prePlay',
          cond: wrapGuard(skipQuestionGuard),
          actions: [skipQuestionEvent]
        }
      }
    },
    prePlay: {
      ...createTimer('prePlay', {
        from: 'prePlay',
        target: 'play',
        rewritable: false,
        duration: ctx => getQuestionDuration(ctx).pre
      }),
      on: {
        skipQuestion: {
          target: 'play',
          cond: wrapGuard(skipQuestionGuard),
          actions: [skipQuestionEvent]
        }
      }
    },
    play: {
      ...createTimer('play', {
        from: 'play',
        target: 'answer',
        rewritable: false,
        duration: ctx => getQuestionDuration(ctx).play,
        always: () => [
          {
            target: 'answer',
            cond: isTimerEnd('play'),
            actions: [setExTurnUserUuid]
          },
          {
            target: 'answer',
            cond: wrapGuard(everyBasicTryAnswerGuard),
            actions: [setExTurnUserUuid]
          }
        ]
      }),
      on: {
        basicTryAnswer: {
          target: 'tryAnswerBuffer',
          cond: wrapGuard(basicTryAnswerGuard),
          actions: basicTryAnswerEvent
        },
        passTryAnswer: {
          cond: wrapGuard(basicTryAnswerGuard),
          actions: passTryAnswerEvent
        },
        skipQuestion: {
          target: 'answer',
          cond: wrapGuard(skipQuestionGuard),
          actions: [skipQuestionEvent, setExTurnUserUuid]
        }
      }
    },
    /**
     * State to collect all tryAnswer then decide the fastest answer.
     */
    tryAnswerBuffer: {
      ...createTimer('tryAnswerBuffer', {
        from: 'tryAnswerBuffer',
        target: 'tryAnswer',
        rewritable: false,
        duration: () => TRY_ANSWER_BUFFER_DURATION,
        always: () => [
          {
            target: 'tryAnswer',
            cond: isTimerEnd('tryAnswerBuffer'),
            actions: setFastestTryAnswer
          }
        ]
      }),
      on: {
        basicTryAnswer: {
          target: 'tryAnswerBuffer',
          cond: wrapGuard(basicTryAnswerGuard),
          actions: basicTryAnswerEvent
        },
        skipQuestion: {
          target: 'answer',
          cond: wrapGuard(skipQuestionGuard),
          actions: [skipQuestionEvent]
        }
      }
    },
    tryAnswer: {
      ...createTimer('try', {
        from: 'tryAnswer',
        target: 'play',
        rewritable: true,
        duration: () => TRY_TIMER_DURATION,
        always: () => [
          {
            target: 'play',
            cond: isTimerEnd('try'),
            actions: [setTryAnswerTimeout, resetTryAnswerBufferAction]
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
          target: 'play',
          cond: wrapGuard(hostUniversalGuard),
          actions: [rejectAnswerEvent, resetTryAnswerBufferAction, setExTurnUserUuid]
        },
        skipQuestion: {
          target: 'answer',
          cond: wrapGuard(skipQuestionGuard),
          actions: [skipQuestionEvent, setExTurnUserUuid]
        }
      }
    },
    answer: {
      ...createTimer('answer', {
        from: 'answer',
        target: 'end',
        rewritable: false,
        duration: ctx => getQuestionDuration(ctx).answer
      }),
      on: {
        skipQuestion: {
          target: 'end',
          cond: wrapGuard(skipQuestionGuard),
          actions: [skipQuestionEvent]
        }
      },
      exit: resetTryAnswerBufferAction
    },
    end: {
      type: 'final'
    }
  }
};
