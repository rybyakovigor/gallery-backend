// Core
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Types
import { TransactionClient } from '../types/transactionClient.interface';

@Injectable()
export class TransactionService extends PrismaClient {
  public getTransactionClient<T>(callback: (txClient: TransactionClient) => Promise<T>): Promise<T> {
    return this.$transaction(callback);
  }
}
