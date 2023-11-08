import {Game, Package, PackageVersionFull} from '@opeq-dev/openquiz-schema';
import {Action} from './actions';

export type UserRole = 'LEADER' | 'PLAYER';

export type UserRecord = {
  uuid: string;
  /**
   * TODO: rename LEADER to HOST
   * @deprecated rename LEADER to HOST
   */
  role: UserRole;
  teamUuid: string | null;
};

export interface TeamRecordStyle {
  color: string;
}

export type TeamRecord = {
  uuid: string;
  name: string;
  score: number;
  style: TeamRecordStyle;
  leaderUuid: string;
};

export interface MachinePkg extends Package {
  versions: PackageVersionFull[];
}

export type MachineTimerKey =
  | 'splash'
  | 'loading'
  | 'prePlay'
  | 'play'
  | 'try'
  | 'tryAnswerBuffer'
  | 'answer'
  | 'auctionBets'
  | 'finalBets'
  | 'finalBans';

export interface MachineTimer {
  current: number;
  duration: number;
}

export type QuestionStepStage = 'pre-play' | 'play' | 'answer';

export interface TryAnswerBufferItem {
  teamUuid: string;
  userUuid: string;
  timestamp: number;
}

export interface Ctx {
  version: string;
  game: Pick<Game<Ctx>, 'uuid' | 'name' | 'settings'> | null;
  pkg: MachinePkg | null;
  users: UserRecord[];
  teams: TeamRecord[];
  current: {
    roundUuid: string | null;
    questionUuid: string | null;
    turnTeamUuid: string | null;
    pause: boolean;
  };
  tryAnswerBuffer: TryAnswerBufferItem[];
  history: Action[];
  timers: Record<MachineTimerKey, MachineTimer>;
}
