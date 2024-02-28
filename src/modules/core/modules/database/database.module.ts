// Core
import { Global, Module } from '@nestjs/common';

// Services
import { PrismaService } from './services/prisma.service';
import { TransactionService } from './services/transaction.service';

@Global()
@Module({
  providers: [PrismaService, TransactionService],
  exports: [PrismaService, TransactionService],
})
export class DatabaseModule {}
