// Core
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../core/modules/database/services/prisma.service';

// Types
import { TransactionClient } from '../core/modules/database/types/transactionClient.interface';
import { Metric, MetricRepository } from './types/metrics';

@Injectable()
export class MetricsRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  private repository(tx?: TransactionClient): MetricRepository {
    return tx ? tx.metric : this.prismaService.metric;
  }

  public findAll(where?: Prisma.MetricWhereInput): Promise<Metric[]> {
    return this.repository().findMany({ where });
  }

  public async create(body: Prisma.MetricCreateInput, tx?: TransactionClient): Promise<Metric> {
    return this.repository(tx).create({ data: body });
  }

  public async findById(id: string, tx?: TransactionClient): Promise<Metric | null> {
    return this.repository(tx).findUnique({ where: { id } });
  }

  public async update(id: string, body: Prisma.MaterialUpdateInput, tx?: TransactionClient): Promise<Metric> {
    return this.repository(tx).update({ where: { id }, data: body });
  }

  public async delete(id: string, tx?: TransactionClient): Promise<Metric> {
    return this.repository(tx).delete({ where: { id } });
  }
}
