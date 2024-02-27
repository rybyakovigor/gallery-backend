// Core
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

// Module
import { AppModule } from './app.module';

// Logger
import { initializeLogger } from './modules/core/modules/logger/initialize';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, cors: true });

  // Helmet
  app.use(helmet());

  // Logger
  initializeLogger(app);

  await app.listen(3000);
}

bootstrap();
