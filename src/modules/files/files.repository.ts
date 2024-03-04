// Core
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../core/modules/database/services/prisma.service';

// Types
import { File, FileRepository } from './types/file';
import { TransactionClient } from '../core/modules/database/types/transactionClient.interface';

@Injectable()
export class FilesRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  private filesRepository(tx?: TransactionClient): FileRepository {
    return tx ? tx.file : this.prismaService.file;
  }

  public async findAll(where?: Prisma.FileWhereInput): Promise<File[]> {
    return this.filesRepository().findMany({ where });
  }

  public async create(body: Prisma.FileCreateInput, tx?: TransactionClient): Promise<File> {
    return this.filesRepository(tx).create({ data: body });
  }

  public async findById(id: string, tx?: TransactionClient): Promise<File> {
    return this.filesRepository(tx).findUnique({ where: { id } });
  }

  public async update(id: string, body: Prisma.FileUpdateInput, tx?: TransactionClient): Promise<File> {
    return this.filesRepository(tx).update({ where: { id }, data: body });
  }

  public async delete(id: string, tx?: TransactionClient): Promise<File> {
    return this.filesRepository(tx).delete({ where: { id } });
  }
}
