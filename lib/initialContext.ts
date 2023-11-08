import {version} from '../package.json';
import {Ctx} from './types';

export const initialContext: Ctx = {
  version,
  game: null,
  pkg: null,
  teams: [],
  users: [],
  current: {
    roundUuid: null,
    questionUuid: null,
    turnTeamUuid: null,
    pause: false
  },
  tryAnswerBuffer: [],
  history: [],
  timers: {
    splash: {current: 0, duration: 0},
    loading: {current: 0, duration: 0},
    prePlay: {current: 0, duration: 0},
    play: {current: 0, duration: 0},
    tryAnswerBuffer: {current: 0, duration: 0},
    try: {current: 0, duration: 0},
    answer: {current: 0, duration: 0},
    auctionBets: {current: 0, duration: 0},
    finalBets: {current: 0, duration: 0},
    finalBans: {current: 0, duration: 0}
  }
};
