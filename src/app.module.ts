import { EthereumModule } from "./ethereum/balance.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "ethereum/files"),
    }),
    EthereumModule,
  ],
})
export class AppModule {}
