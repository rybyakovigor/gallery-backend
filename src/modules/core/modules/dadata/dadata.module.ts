// Core
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// Services
import { AppConfigService } from '../config/config.service';
import { DadataService } from './dadata.service';

// Config
import { getDadataConfig } from './configs/dadata.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [AppConfigService],
      useFactory: getDadataConfig,
    }),
  ],
  providers: [DadataService],
  exports: [DadataService],
})
export class DadataModule {}
