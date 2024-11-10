// Core
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

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
  @HttpCode(HttpStatus.NO_CONTENT)
  public async create(@Body() body: CreateMetricDto, @Req() request: Request): Promise<void> {
    this.service.create(body, request);
  }
}
