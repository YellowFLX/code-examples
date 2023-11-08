import {StateNodeConfig} from 'xstate';
import {Action} from './actions';
import {Ctx} from './context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateConfig = StateNodeConfig<Ctx, any, Action>;
