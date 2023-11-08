export interface EventSelf {
  teamUuid: string;
  userUuid: string;
}

export interface MakeEvent<T, P> {
  type: T;
  self: EventSelf;
  /**
   * Contents of the send event (data).
   */
  payload: P;
}
