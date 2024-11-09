// Core
import { Module } from '@nestjs/common';

// Modules
import { CoreModule } from './modules/core/core.module';
import { FilesModule } from './modules/files/files.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { FramingTypesModule } from './modules/framing-types/framing-types.module';
import { WorksModule } from './modules/works/works.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [CoreModule, FilesModule, MaterialsModule, FramingTypesModule, WorksModule, FeedbackModule, MetricsModule],
})
export class AppModule {}
