// Core
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../core/modules/database/services/prisma.service';

// Types
import { TransactionClient } from '../core/modules/database/types/transactionClient.interface';
import { Feedback, FeedbackRepository as FeedbackRepositoryType } from './types/feedback';

@Injectable()
export class FeedbackRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  private repository(tx?: TransactionClient): FeedbackRepositoryType {
    return tx ? tx.feedback : this.prismaService.feedback;
  }

  public findAll(where?: Prisma.FeedbackWhereInput): Promise<Feedback[]> {
    return this.repository().findMany({ where, orderBy: { created_at: 'asc' } });
  }

  public async create(body: Prisma.FeedbackCreateInput, tx?: TransactionClient): Promise<Feedback> {
    return this.repository(tx).create({ data: body });
  }
}
