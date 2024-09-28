// Core
import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Services
import { S3Service } from '@/modules/core/modules/s3/s3.service';
import { TransactionService } from '@/modules/core/modules/database/services/transaction.service';
import { ImageHandlingService } from './image-handling.service';

// Types
import { TransactionClient } from '@/modules/core/modules/database/types/transactionClient.interface';
import { File } from '../types/file';

// Repositories
import { FilesRepository } from '../files.repository';

// Utils
import { generateFileKey } from '../utils/generate-file-key';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  public constructor(
    private readonly repository: FilesRepository,
    private readonly s3Service: S3Service,
    private readonly imageHandlingService: ImageHandlingService,
    private readonly transactionService: TransactionService
  ) {}

  public async create(file: Express.Multer.File, tx?: TransactionClient): Promise<File> {
    const fileName: string = decodeURIComponent(file.originalname);
    const key: string = generateFileKey(file);
    const handlingImage = await this.imageHandlingService.resizeAndConvertToWebp(file);
    const fileBuffer: Buffer = Buffer.from(handlingImage.buffer as unknown as string, 'binary');

    const body: Partial<Prisma.FileCreateInput> = {
      title: fileName,
      key,
    };

    try {
      const { Location } = await this.s3Service.uploadFile(key, fileBuffer, file.mimetype);
      body.path = Location;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Error when upload file to s3', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      return this.repository.create(body as Prisma.FileCreateInput, tx);
    } catch (error) {
      await this.s3Service.deleteFile(key);
      throw new HttpException('Error when save file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async delete(id: string): Promise<void> {
    const file = await this.checkExist(id);

    await this.transactionService.getTransactionClient(async (tx) => {
      try {
        await this.repository.delete(id, tx);
        await this.s3Service.deleteFile(file.key);
      } catch (error) {
        throw new HttpException('Error when delete file', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  public async deleteFromStorage(key: string): Promise<void> {
    try {
      await this.s3Service.deleteFile(key);
    } catch (error) {
      throw new HttpException('Error when delete file from storage', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async checkExist(id: string): Promise<File> {
    const result = await this.repository.findById(id);
    if (!result) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    return result;
  }
}
