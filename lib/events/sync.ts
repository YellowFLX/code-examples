import {assign} from 'xstate';
import {Ctx, Sync} from '../types';

/**
 *
 */
export const sync = assign<Ctx, Sync>((ctx, e): Partial<Ctx> => e.payload.ctx);
