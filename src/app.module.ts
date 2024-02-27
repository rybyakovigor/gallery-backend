// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [CoreModule],
})
export class AppModule {}
