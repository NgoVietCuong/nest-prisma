import { Module } from '@nestjs/common';
import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          stores: [
            createKeyv(configService.get<string>('REDIS_URL')),
          ],
        };
      },
      inject: [ConfigService]
    }),
  ],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheProviderModule {}
