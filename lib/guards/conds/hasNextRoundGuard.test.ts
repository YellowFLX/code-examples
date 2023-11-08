import {describe, expect, it} from 'vitest';
import {initialContext} from '../../initialContext';
import {pkgMock} from '../../mocks/pkgMock';
import {getPkgVersion} from '../../libs';
import {Ctx} from '../../types';
import {hasNextRoundGuard} from './hasNextRoundGuard';

const initialTestContext: Ctx = {
  ...initialContext,
  pkg: pkgMock,
  users: [
    {uuid: 'Player-10', role: 'PLAYER', teamUuid: 'Team-10'},
    {uuid: 'Player-20', role: 'PLAYER', teamUuid: 'Team-20'},
    {uuid: 'Player-30', role: 'PLAYER', teamUuid: 'Team-30'}
  ],
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
  ]
};

describe('hasNextRoundGuard', () => {
  it('should return false if there is no next round', () => {
    expect(hasNextRoundGuard(initialTestContext)).toBe(false);
  });

  it('should return true if there is a next round', () => {
    expect(
      hasNextRoundGuard({
        ...initialTestContext,
        current: {
          ...initialContext.current,
          roundUuid: getPkgVersion(initialTestContext)?.rounds[0].uuid ?? null
        }
      })
    ).toBe(true);
  });
});
