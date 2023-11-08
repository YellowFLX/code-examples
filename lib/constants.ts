export const MAX_TEAMS = 4;

export const MAX_SINGLE_TEAMS = 8;

export const TIMER_TICK = 100;

export const defaultTimers = {
  /**
   * Extra time for the player to have time to listen to the music, read the text.
   */
  EXTRA: 2 * 1000,
  PLAY_STAGE: 30 * 1000,
  TRY_STAGE: 30 * 1000,
  ANSWER_STAGE: 10 * 1000
};

export const splashTimers = {
  basic: 600,
  special: 4000
};

/**
 * @deprecated use `splashTimers`
 */
export const SPLASH_TIMER_DURATION = 4000;

export const TRY_TIMER_DURATION = 30000;

export const TRY_ANSWER_BUFFER_DURATION = 800;

export const CHOOSE_RESPONDER_TIMER_DURATION = 15000;

export const AUCTION_BETS_TIMER_DURATION = 20000;

export const FINAL_BETS_TIMER_DURATION = 20000;

export const FINAL_BANS_TIMER_DURATION = 20000;
