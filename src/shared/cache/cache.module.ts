import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import IORedis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService, logger: Logger) => {
        const redisUrl = configService.get<string>('REDIS_URL')!;

        // Explicit connection test
        const redisClient = new IORedis(redisUrl, { retryStrategy: () => null, maxRetriesPerRequest: 1 });
        redisClient.on('error', (err) => {
          logger.error({ message: `${err.message}`, context: 'RedisClient' });
        });

        try {
          await redisClient.ping();
        } catch (err) {
          throw new Error(err.message);
        } finally {
          await redisClient.quit();
        }

        return {
          stores: [createKeyv(redisUrl)],
        };
      },
      inject: [ConfigService, WINSTON_MODULE_NEST_PROVIDER],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheProviderModule {}
