import {describe, expect, it} from 'vitest';
import {initialContext} from '../initialContext';
import {pkgMock} from '../mocks/pkgMock';
import {Ctx} from '../types';
import {getCurrentQuestion} from './getCurrentQuestion';
import {getPkgVersion} from './getPkgVersion';

const initialTestContext: Ctx = {
  ...initialContext,
  pkg: pkgMock
};

const version = getPkgVersion(initialTestContext);

describe('getCurrentQuestion', () => {
  it('should return undefined if there is no active question', () => {
    expect(getCurrentQuestion(initialTestContext)).toBe(undefined);
  });

  it('should return the object of the current question', () => {
    expect(
      getCurrentQuestion({
        ...initialTestContext,
        current: {
          ...initialTestContext.current,
          questionUuid: version?.questions[0].uuid ?? null
        }
      })
    ).toStrictEqual(version?.questions[0]);
  });
});
