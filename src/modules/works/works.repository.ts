// Core
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../core/modules/database/services/prisma.service';

// Types
import { TransactionClient } from '../core/modules/database/types/transactionClient.interface';
import { Work, WorkRepository } from './types/work';

@Injectable()
export class WorksRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  private repository(tx?: TransactionClient): WorkRepository {
    return tx ? tx.work : this.prismaService.work;
  }

  public findAll(where?: Prisma.WorkWhereInput, limit?: string): Promise<Work[]> {
    return this.repository().findMany({
      where,
      include: {
        images: { select: { file: true } },
        materials: { select: { material: true } },
        framing_types: { select: { framing_type: true } },
      },
      take: limit ? Number(limit) : undefined,
      orderBy: { created_at: 'asc' },
    });
  }

  public async create(body: Prisma.WorkCreateInput, tx?: TransactionClient): Promise<Work> {
    return this.repository(tx).create({
      data: body,
      include: {
        materials: { select: { material: true } },
        framing_types: { select: { framing_type: true } },
        images: { select: { id: true, file: true } },
      },
    });
  }

  public async findById(id: string, tx?: TransactionClient): Promise<Work | null> {
    return this.repository(tx).findUnique({
      where: { id },
      include: {
        materials: { select: { material: true } },
        framing_types: { select: { framing_type: true } },
        images: { select: { id: true, file: true } },
      },
    });
  }

  public async update(id: string, body: Prisma.WorkUpdateInput, tx?: TransactionClient): Promise<Work> {
    return this.repository(tx).update({
      where: { id },
      include: {
        materials: { select: { material: true } },
        framing_types: { select: { framing_type: true } },
        images: { select: { file: true } },
      },
      data: body,
    });
  }

  public async delete(id: string, tx?: TransactionClient): Promise<Work> {
    return this.repository(tx).delete({ where: { id } });
  }
}
