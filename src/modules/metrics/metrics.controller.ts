// Core
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

// Services
import { MetricsService } from './metrics.service';

// Pipes
import { UuidV6ValidationPipe } from '../core/pipes/validate-uuidv6.pipe';

// DTO
import { CreateMetricDto } from './dto/create-metric.dto';

// Types
import { Metric } from './types/metrics';

// Guards
import { AuthGuard } from '../core/guards/auth.guard';

@Controller('metrics')
export class MetricsController {
  public constructor(private readonly service: MetricsService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async findAll(): Promise<Metric[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  public async findById(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<Metric> {
    return this.service.findById(id);
  }

  @Post()
  public async create(@Body() body: CreateMetricDto): Promise<Metric> {
    return this.service.create(body);
  }
}
