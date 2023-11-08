import {hostUniversalGuard, wrapGuard} from '../.';
import {setNextRound} from '../actions';
import {startEvent} from '../events';
import {hasNextRoundGuard, isRoundType} from '../guards';
import {StateConfig} from '../types';
import {basicRoundState} from './rounds';

export const gameState: StateConfig = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        start: {
          target: 'fetch',
          cond: wrapGuard(hostUniversalGuard),
          actions: startEvent
        }
      }
    },
    fetch: {
      always: [
        {
          target: 'basicRound',
          cond: isRoundType('BASIC')
        },
        {
          target: 'finalRound',
          cond: isRoundType('FINAL')
        }
      ]
    },
    basicRound: {
      ...basicRoundState,
      onDone: 'done'
    },
    done: {
      always: [
        {
          target: 'fetch',
          cond: hasNextRoundGuard,
          actions: setNextRound
        },
        {target: 'end'}
      ]
    },
    end: {
      type: 'final',
      entry: () => void 0
    }
  }
};
