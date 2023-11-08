import {
  AcceptAnswerEvent,
  AcceptFinalAnswerEvent,
  BanPlayerEvent,
  BasicTryAnswerEvent,
  ChangeSettingsEvent,
  ChangeTeamLeaderEvent,
  ChangeTeamNameEvent,
  ChangeTeamScoreEvent,
  ChangeTeamStyleEvent,
  ChangeTurnEvent,
  ChooseBanThemeEvent,
  ChooseQuestionEvent,
  ChooseResponderEvent,
  ChooseRoundEvent,
  ChooseVariantEvent,
  ConnectHostEvent,
  ConnectPlayerEvent,
  DisconnectUserEvent,
  FinishLoadingEvent,
  KickPlayerEvent,
  PassBetEvent,
  PassFinalBetEvent,
  PassTryAnswerEvent,
  RejectAnswerEvent,
  RejectFinalAnswerEvent,
  SkipQuestionEvent,
  SkipRoundEvent,
  StartEvent,
  TogglePauseEvent,
  TypeBetEvent,
  TypeFinalAnswerEvent,
  TypeFinalBetEvent
} from '../events';
import {Ctx} from './context';
import {MakeEvent} from './event';

export type Sync = MakeEvent<'#system/sync', {ctx: Ctx}>;

export type SystemSetNextRound = MakeEvent<
  '#system/setNextRound',
  {roundUuid: string | null}
>;

export type SystemSetShownRoundSplash = MakeEvent<
  '#system/setShownRoundSplash',
  {roundUuid: string}
>;

export type SystemSetEndQuestion = MakeEvent<'#system/setEndQuestion', void>;

export type SystemSetFastestTryAnswer = MakeEvent<
  '#system/setFastestTryAnswer',
  {questionUuid: string}
>;

export type SystemSetTryAnswerTimeout = MakeEvent<
  '#system/setTryAnswerTimeout',
  {
    teamUuid: string;
    questionUuid: string;
  }
>;

export type SystemSetVariantDecision = MakeEvent<
  '#system/setVariantDecision',
  {
    teamUuid: string;
    questionUuid: string;
    decision: boolean;
  }
>;

export type Action =
  | AcceptAnswerEvent
  | AcceptFinalAnswerEvent
  | BanPlayerEvent
  | BasicTryAnswerEvent
  | ChangeSettingsEvent
  | ChangeTeamLeaderEvent
  | ChangeTeamNameEvent
  | ChangeTeamScoreEvent
  | ChangeTeamStyleEvent
  | ChangeTurnEvent
  | ChooseBanThemeEvent
  | ChooseQuestionEvent
  | ChooseResponderEvent
  | ChooseRoundEvent
  | ChooseVariantEvent
  | ConnectHostEvent
  | ConnectPlayerEvent
  | DisconnectUserEvent
  | FinishLoadingEvent
  | KickPlayerEvent
  | PassBetEvent
  | PassFinalBetEvent
  | PassTryAnswerEvent
  | RejectAnswerEvent
  | RejectFinalAnswerEvent
  | SkipQuestionEvent
  | SkipRoundEvent
  | StartEvent
  | Sync
  | SystemSetEndQuestion
  | SystemSetFastestTryAnswer
  | SystemSetNextRound
  | SystemSetShownRoundSplash
  | SystemSetTryAnswerTimeout
  | SystemSetVariantDecision
  | TogglePauseEvent
  | TypeBetEvent
  | TypeFinalAnswerEvent
  | TypeFinalBetEvent;
