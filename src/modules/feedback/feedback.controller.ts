// Core
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

// Services
import { FeedbackService } from './feedback.service';

// Guards
import { AuthGuard } from '../core/guards/auth.guard';

// Types
import { Feedback } from './types/feedback';

// DTO
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  public constructor(private readonly service: FeedbackService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async findAll(): Promise<Feedback[]> {
    return this.service.findAll();
  }

  @Post()
  public async create(@Body() body: CreateFeedbackDto): Promise<Feedback> {
    return this.service.create(body);
  }
}
