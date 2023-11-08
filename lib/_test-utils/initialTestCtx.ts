import {pkgMock} from '../mocks/pkgMock';
import {initialContext} from '../initialContext';
import {Ctx} from '../types';

export const initialTestCtx: Ctx = {
  ...initialContext,
  game: {
    uuid: 'game-uuid',
    name: 'game-name',
    settings: {
      gameUuid: 'game-uuid',
      slots: 8,
      prePlay: true,
      teamMode: false
    }
  },
  pkg: pkgMock,
  teams: [
    {
      uuid: 'Team-10',
      score: 10,
      name: 'Team-10',
      style: {color: '#fff'},
      leaderUuid: 'Player-10'
    },
    {
      uuid: 'Team-20',
      score: 20,
      name: 'Team-20',
      style: {color: '#fff'},
      leaderUuid: 'Player-20'
    },
    {
      uuid: 'Team-30',
      score: 30,
      name: 'Team-30',
      style: {color: '#fff'},
      leaderUuid: 'Player-30'
    }
  ],
  users: [
    {uuid: 'Player-10', role: 'PLAYER', teamUuid: 'Team-10'},
    {uuid: 'Player-20', role: 'PLAYER', teamUuid: 'Team-20'},
    {uuid: 'Player-30', role: 'PLAYER', teamUuid: 'Team-30'},
    {uuid: 'Player-40', role: 'PLAYER', teamUuid: 'Team-10'}
  ]
};
