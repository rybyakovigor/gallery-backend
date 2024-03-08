// Core
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../core/modules/database/services/prisma.service';

// Types
import { TransactionClient } from '../core/modules/database/types/transactionClient.interface';
import { FramingType, FramingTypeRepository } from './types/framing-type';

@Injectable()
export class FramingTypesRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  private repository(tx?: TransactionClient): FramingTypeRepository {
    return tx ? tx.framingType : this.prismaService.framingType;
  }

  public findAll(where?: Prisma.FramingTypeWhereInput): Promise<FramingType[]> {
    return this.repository().findMany({ where });
  }

  public async create(body: Prisma.FramingTypeCreateInput, tx?: TransactionClient): Promise<FramingType> {
    return this.repository(tx).create({ data: body });
  }

  public async findById(id: string, tx?: TransactionClient): Promise<FramingType | null> {
    return this.repository(tx).findUnique({ where: { id } });
  }

  public async update(id: string, body: Prisma.FramingTypeUpdateInput, tx?: TransactionClient): Promise<FramingType> {
    return this.repository(tx).update({ where: { id }, data: body });
  }

  public async delete(id: string, tx?: TransactionClient): Promise<FramingType> {
    return this.repository(tx).delete({ where: { id } });
  }
}
