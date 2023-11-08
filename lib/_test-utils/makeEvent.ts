import {Action} from '../types';

/**
 *
 * @param type
 * @param payload
 * @returns
 */
export const makeEvent = <T extends Action>(type: T['type'], payload: T['payload']) => ({
  type,
  payload
});
