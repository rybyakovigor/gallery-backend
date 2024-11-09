// Core
import { Injectable, NotFoundException } from '@nestjs/common';

// Repository
import { CreateMetricDto } from './dto/create-metric.dto';

// Types
import { Metric } from './types/metrics';

// Dto
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsService {
  public constructor(private readonly repository: MetricsRepository) {}

  public async findAll(): Promise<Metric[]> {
    return this.repository.findAll();
  }

  public async create(body: CreateMetricDto): Promise<Metric> {
    return await this.repository.create(body);
  }

  public async findById(id: string): Promise<Metric> {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new NotFoundException(`Material with id ${id} not found`);
    }
    return row;
  }
}
