// Core
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthCheckResult, PrismaHealthIndicator } from '@nestjs/terminus';

// Services
import { PrismaService } from '../database/services/prisma.service';

@Controller('health')
export class HealthController {
  public constructor(
    private prismaHealthIndicator: PrismaHealthIndicator,
    private health: HealthCheckService,
    private prismaService: PrismaService
  ) {}

  @Get()
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.prismaHealthIndicator.pingCheck('database', this.prismaService)]);
  }
}
