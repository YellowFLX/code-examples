import {Ctx} from './context';
import {EventSelf} from './event';

export type Guard<T> = (ctx: Ctx) => (auth: EventSelf, payload: T) => boolean;

export type GuardEmpty = (ctx: Ctx) => (auth: EventSelf) => boolean;
