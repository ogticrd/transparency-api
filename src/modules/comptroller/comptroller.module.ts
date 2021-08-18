import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Agent } from 'https';

import { ComptrollerService } from './comptroller.service';
import { ComptrollerController } from './comptroller.controller';

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
