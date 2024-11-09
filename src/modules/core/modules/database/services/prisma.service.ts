// Core
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  public async onModuleInit(): Promise<void> {
    try {
      this.logger.log('Applying Prisma migrations...');
      await execAsync('npx prisma migrate deploy');
      this.logger.log('Migrations applied successfully.');

      await this.$connect();
      this.logger.log('Prisma connected to the database.');
    } catch (error) {
      this.logger.error('Error applying migrations or connecting to the database:', error);
      throw error;
    }
  }
}
