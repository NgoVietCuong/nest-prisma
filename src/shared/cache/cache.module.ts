import { Global, Module } from '@nestjs/common';
import KeyvRedis, { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';
import { Cacheable } from 'cacheable';
// import { redisStore } from 'cache-manager-redis-yet';
import Keyv from 'keyv';
import IORedis from 'ioredis';
import * as redisStore from 'cache-manager-ioredis';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST') || 'localhost';
        const port = configService.get<number>('REDIS_PORT') || 6379;

        // 🔐 Explicit connection test
        const testRedis = new IORedis({ host, port });
        try {
          await testRedis.ping();
        } catch (err) {
          throw new Error(`Redis Connection Error: ${err.message}`);
        } finally {
          await testRedis.quit();
        }

        // ✅ Safe to proceed with cache-manager-ioredis
        return {
          store: redisStore,
          host,
          port,
        };
      },
      inject: [ConfigService]
    }),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: async () => ({
    //     store: await redisStore({
    //       socket: {
    //         host: 'localhost',
    //         port: 6379,
    //       },
    //     }),
    //   }),
    // }),
  ],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheProviderModule {}
