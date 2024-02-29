// Core
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

// Services
import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule {}
