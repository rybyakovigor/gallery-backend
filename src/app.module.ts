// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './modules/core/core.module';
import { FilesModule } from './modules/files/files.module';
import { MaterialsModule } from './modules/materials/materials.module';

@Module({
  imports: [CoreModule, FilesModule, MaterialsModule],
})
export class AppModule {}
