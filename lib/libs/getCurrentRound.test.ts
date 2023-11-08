import {describe, expect, it} from 'vitest';
import {initialContext} from '../initialContext';
import {pkgMock} from '../mocks/pkgMock';
import {Ctx} from '../types';
import {getCurrentRound} from './getCurrentRound';
import {getPkgVersion} from './getPkgVersion';

const initialTestContext: Ctx = {
  ...initialContext,
  pkg: pkgMock
};

const version = getPkgVersion(initialTestContext);

describe('getCurrentRound', () => {
  it('should return undefined if there is no active round', () => {
    expect(getCurrentRound(initialTestContext)).toBe(undefined);
  });

  it('should return the object of the current round', () => {
    expect(
      getCurrentRound({
        ...initialTestContext,
        current: {
          ...initialTestContext.current,
          roundUuid: version?.rounds[0].uuid ?? null
        }
      })
    ).toStrictEqual(version?.rounds[0]);
  });
});
