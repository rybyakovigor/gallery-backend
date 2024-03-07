// Core
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Services
import { PrismaService } from '../core/modules/database/services/prisma.service';

// Types
import { TransactionClient } from '../core/modules/database/types/transactionClient.interface';
import { Material, MaterialRepository } from './types/material';

@Injectable()
export class MaterialsRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  private materialRepository(tx?: TransactionClient): MaterialRepository {
    return tx ? tx.material : this.prismaService.material;
  }

  public findAll(where?: Prisma.MaterialWhereInput): Promise<Material[]> {
    return this.materialRepository().findMany({ where });
  }

  public async create(body: Prisma.MaterialCreateInput, tx?: TransactionClient): Promise<Material> {
    return this.materialRepository(tx).create({ data: body });
  }

  public async findById(id: string, tx?: TransactionClient): Promise<Material> {
    return this.materialRepository(tx).findUnique({ where: { id } });
  }

  public async update(id: string, body: Prisma.MaterialUpdateInput, tx?: TransactionClient): Promise<Material> {
    return this.materialRepository(tx).update({ where: { id }, data: body });
  }

  public async delete(id: string, tx?: TransactionClient): Promise<Material> {
    return this.materialRepository(tx).delete({ where: { id } });
  }
}
