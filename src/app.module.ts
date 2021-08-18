import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ComptrollerModule } from '@modules/comptroller/comptroller.module';
import { TransparencyModule } from '@modules/transparency/transparency.module';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TransparencyModule,
    ComptrollerModule,
  ],
})
export class AppModule {
  static port: number;
  static apiVersion: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
    AppModule.apiVersion = this.configService.get('API_VERSION');
  }
}
