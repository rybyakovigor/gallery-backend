import { PrismaClient } from '@prisma/client';

export interface TransactionClient
  extends Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'> {}
