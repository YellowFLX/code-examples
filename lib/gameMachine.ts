import {createMachine} from 'xstate';
import {gameState} from './states/gameState';
import {Action, Ctx} from './types';
import {initialContext} from './initialContext';
import {sync} from './events';

export const gameMachine = createMachine<Ctx, Action>({
  id: 'Game',
  initial: 'lobby',
  type: 'parallel',
  context: initialContext,
  schema: {
    context: {} as Ctx,
    events: {} as Action
  },
  preserveActionOrder: true,
  predictableActionArguments: true,
  states: {
    sync: {
      on: {
        '#system/sync': {
          actions: sync
        }
      }
    },
    game: gameState
  }
});
