import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { validateEnv } from './env.schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['../../.env'],
      isGlobal: true,
      validate: validateEnv,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule { }
