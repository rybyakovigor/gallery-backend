// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './modules/core/core.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [CoreModule, FilesModule],
})
export class AppModule {}
