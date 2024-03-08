// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './modules/core/core.module';
import { FilesModule } from './modules/files/files.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { FramingTypesModule } from './modules/framing-types/framing-types.module';

@Module({
  imports: [CoreModule, FilesModule, MaterialsModule, FramingTypesModule],
})
export class AppModule {}
