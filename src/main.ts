// Core
import { NestFactory } from '@nestjs/core';

// Module
import { AppModule } from './app.module';

// Logger
import { initializeLogger } from './modules/core/modules/logger/initialize';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, cors: true });

  // Logger
  initializeLogger(app);

  await app.listen(3000);
}

bootstrap();
