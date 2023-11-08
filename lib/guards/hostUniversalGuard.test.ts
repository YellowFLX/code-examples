import {afterEach, describe, expect, it} from 'vitest';
import {getContextMock} from '../mocks/getContextMock';
import {hostUniversalGuard} from './hostUniversalGuard';

describe('hostUniversalGuard', () => {
  const {ctx, reset, hostAuth, playerAuth} = getContextMock();

  afterEach(() => {
    reset();
  });

  it('should return false, если хост', () => {
    expect(hostUniversalGuard(ctx)(playerAuth)).toBe(false);
  });

  it('should return true, если не хост', () => {
    expect(hostUniversalGuard(ctx)(hostAuth)).toBe(true);
  });
});
