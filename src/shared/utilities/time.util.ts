import type { StringValue } from 'ms';
import ms from 'ms';

/**
 * Normalize TTL for JWT and Redis
 */
export function getTtlValue(rawTtl: string | number): number {
  if (typeof rawTtl === 'string') {
    return Math.floor(ms(rawTtl as StringValue) / 1000);
  }

  return rawTtl;
}
