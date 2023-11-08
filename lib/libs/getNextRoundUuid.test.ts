import {describe, expect, it} from 'vitest';
import {initialContext} from '../initialContext';
import {pkgMock} from '../mocks/pkgMock';
import {Ctx} from '../types';
import {getNextRoundUuid} from './getNextRoundUuid';
import {getPkgVersion} from './getPkgVersion';

const initialTestContext: Ctx = {
  ...initialContext,
  pkg: pkgMock
};

const version = getPkgVersion(initialTestContext);

describe('getNextRoundUuid', () => {
  it('should return null if no initial round is given', () => {
    expect(getNextRoundUuid(initialTestContext)).toBe(null);
  });

  it('should return null if there is no package', () => {
    expect(getNextRoundUuid({...initialTestContext, pkg: null})).toBe(null);
  });

  it('should return null if it does`t exist', () => {
    expect(
      getNextRoundUuid({
        ...initialTestContext,
        current: {
          ...initialTestContext.current,
          roundUuid: version?.rounds[version?.rounds.length - 1].uuid ?? null
        }
      })
    ).toBe(null);
  });

  it('should return the next round if there is one', () => {
    expect(
      getNextRoundUuid({
        ...initialTestContext,
        current: {
          ...initialTestContext.current,
          roundUuid: version?.rounds[0].uuid ?? null
        }
      })
    ).toBe(version?.rounds[1].uuid);
  });
});
