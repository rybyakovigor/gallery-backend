// Core
import { Injectable } from '@nestjs/common';

// Types
import { Feedback } from './types/feedback';

// Dto
import { CreateFeedbackDto } from './dto/create-feedback.dto';

// Repositories
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
  public constructor(private readonly repository: FeedbackRepository) {}

  public async findAll(): Promise<Feedback[]> {
    return this.repository.findAll();
  }

  public async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const data = {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
    };

    return await this.repository.create(data);
  }
}
