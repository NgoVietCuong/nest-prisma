import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async setCache<T>(key: string, value: T, ttl?: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async deleteCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async getCache<T>(key: string): Promise<T | null> {
    return this.cacheManager.get<T>(key);
  }
}
