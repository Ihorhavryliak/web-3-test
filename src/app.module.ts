import { EthereumModule } from './ethereum/balance.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
;


@Module({
  controllers: [],
  providers: [],
  imports: [  ConfigModule.forRoot({
    envFilePath: ".env"
  }),
  EthereumModule
  ],
})
export class AppModule {}
