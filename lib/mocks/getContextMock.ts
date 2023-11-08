import {faker} from '@faker-js/faker';
import {Action, Ctx, TeamRecord, UserRecord, initialContext} from '../.';
import {Game, PackageVersionFull} from '@opeq-dev/openquiz-schema';
import {pkgMock} from './pkgMock';

export const getFakeTeam = (
  data: Pick<TeamRecord, 'uuid' | 'score' | 'leaderUuid'>
): TeamRecord => {
  return {
    name: faker.animal.type(),
    style: {color: 'red'},
    ...data
  };
};

export const getFakeUser = (data: Pick<UserRecord, 'role' | 'teamUuid'>): UserRecord => {
  return {
    uuid: faker.string.uuid(),
    ...data
  };
};

export const pushHostEventFn =
  <T extends Action>(ctx: Ctx) =>
  (event: Pick<T, 'type' | 'payload'>) => {
    ctx.history.push({
      type: event.type,
      self: {
        teamUuid: '',
        userUuid: ctx.users.find(user => user.role === 'LEADER')?.uuid || ''
      },
      payload: event.payload
    } as Action);
  };

export const pushTeamEventFn =
  <T extends Action>(ctx: Ctx) =>
  (teamUuid: string, event: Pick<T, 'type' | 'payload'>) => {
    const team = ctx.teams.find(team => team.uuid === teamUuid);
    ctx.history.push({
      type: event.type,
      self: {teamUuid: team!.uuid, userUuid: team!.leaderUuid},
      payload: event.payload
    } as Action);
  };

export const pushUserEventFn =
  <T extends Action>(ctx: Ctx) =>
  (userUuid: string, event: Pick<T, 'type' | 'payload'>) => {
    const user = ctx.users.find(user => user.uuid === userUuid);
    ctx.history.push({
      type: event.type,
      self: {teamUuid: user?.teamUuid || '', userUuid},
      payload: event.payload
    } as Action);
  };

export const changeUsersFn = (ctx: Ctx) => (users: UserRecord[]) => {
  ctx.users = [...users];
};

export const changeTeamsFn = (ctx: Ctx) => (teams: TeamRecord[]) => {
  ctx.teams = [...teams];
};

export const changeGameFn = (ctx: Ctx) => (game: Partial<Ctx['game']>) => {
  ctx.game = {...ctx.game, ...game} as Game<Ctx>;
};

export const changeCurrentFn = (ctx: Ctx) => (current: Partial<Ctx['current']>) => {
  ctx.current = {...ctx.current, ...current};
};

export const resetFn = (ctx: Ctx) => () => {
  ctx.current = initialContext.current;
  ctx.history = [];
};

export const getContextMock = () => {
  const hostUser = getFakeUser({role: 'LEADER', teamUuid: null});

  const playerUser = getFakeUser({
    role: 'PLAYER',
    teamUuid: '4657bd21-ab14-4278-82f3-fe22de89eb81'
  });

  const users: UserRecord[] = [
    playerUser,
    getFakeUser({role: 'PLAYER', teamUuid: '4657bd21-ab14-4278-82f3-fe22de89eb81'}),
    getFakeUser({role: 'PLAYER', teamUuid: '538d274f-dffc-4bed-92ca-1ff077376d68'}),
    getFakeUser({role: 'PLAYER', teamUuid: 'c81089e8-86ca-4f57-b554-2ac4c2c4e48a'}),
    getFakeUser({role: 'PLAYER', teamUuid: 'e49fa34f-9a4d-41eb-b879-61aaaddc7cc9'}),
    getFakeUser({role: 'PLAYER', teamUuid: '31235898-6bdb-4d3a-a936-cfb53ff07e04'}),
    hostUser
  ];

  const teams: TeamRecord[] = [
    getFakeTeam({
      uuid: '4657bd21-ab14-4278-82f3-fe22de89eb81',
      score: 0,
      leaderUuid: users[0].uuid
    }),
    getFakeTeam({
      uuid: '538d274f-dffc-4bed-92ca-1ff077376d68',
      score: 1000,
      leaderUuid: users[1].uuid
    }),
    getFakeTeam({
      uuid: 'c81089e8-86ca-4f57-b554-2ac4c2c4e48a',
      score: -5000,
      leaderUuid: users[2].uuid
    }),
    getFakeTeam({
      uuid: 'e49fa34f-9a4d-41eb-b879-61aaaddc7cc9',
      score: 3000,
      leaderUuid: users[3].uuid
    }),
    getFakeTeam({
      uuid: '31235898-6bdb-4d3a-a936-cfb53ff07e04',
      score: 8000,
      leaderUuid: users[4].uuid
    })
  ];

  const ctx: Ctx = {
    ...initialContext,
    pkg: pkgMock,
    users,
    teams,
    current: {
      ...initialContext.current
    },
    history: [...initialContext.history]
  };

  const version = ctx.pkg?.versions[0] as PackageVersionFull;

  return {
    ctx,
    hostUser,
    hostAuth: {teamUuid: '', userUuid: hostUser.uuid},
    playerUser,
    playerAuth: {teamUuid: playerUser.teamUuid as string, userUuid: playerUser.uuid},
    version,
    changeUsers: changeUsersFn(ctx),
    changeTeams: changeTeamsFn(ctx),
    changeCurrent: changeCurrentFn(ctx),
    changeGame: changeGameFn(ctx),
    pushHostEvent: pushHostEventFn(ctx),
    pushTeamEvent: pushTeamEventFn(ctx),
    reset: resetFn(ctx)
  };
};
