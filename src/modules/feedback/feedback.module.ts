// Core
import { Module } from '@nestjs/common';

// Repositories
import { FeedbackRepository } from './feedback.repository';

// Services
import { FeedbackService } from './feedback.service';

// Controllers
import { FeedbackController } from './feedback.controller';

@Module({
  providers: [FeedbackService, FeedbackRepository],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
