import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Agent } from 'https';

import { ComptrollerController } from './comptroller.controller';
import { ComptrollerService } from './comptroller.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          baseURL: config.get('COMPTROLLER_API_URI'),
          httpsAgent: new Agent({
            rejectUnauthorized: false,
          }),
        };
      },
    }),
  ],
  providers: [ComptrollerService],
  controllers: [ComptrollerController],
})
export class ComptrollerModule {}
