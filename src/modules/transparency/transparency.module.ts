import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransparencyController } from './transparency.controller';
import { TransparencyService } from './transparency.service';
import { Token } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    HttpModule.registerAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          baseURL: config.get('TRANSPARENCY_API_URI'),
        };
      },
    }),
  ],
  controllers: [TransparencyController],
  providers: [TransparencyService],
})
export class TransparencyModule {}
