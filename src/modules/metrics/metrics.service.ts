// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { getClientIp } from 'request-ip';
import { UAParser } from 'ua-parser-js';

// Services
import { DadataService } from '../core/modules/dadata/dadata.service';

// Repository
import { CreateMetricDto } from './dto/create-metric.dto';

// Types
import { Metric } from './types/metrics';

// Dto
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsService {
  public constructor(
    private readonly repository: MetricsRepository,
    private readonly dadataService: DadataService
  ) {}

  public async findAll(): Promise<Metric[]> {
    return this.repository.findAll();
  }

  public async create(body: CreateMetricDto, request: Request): Promise<Metric> {
    const ip = getClientIp(request);
    if (ip) {
      body.ip = ip;
      const { location: locationResponse } = await this.dadataService.findCityByIp(ip);
      if (locationResponse) {
        const location = {
          city: locationResponse?.data.city_with_type,
          region: locationResponse?.data.region_with_type,
          country: locationResponse?.data.country,
        };
        body.location = location;
      }
    }

    const parser = new UAParser();
    const userAgent = request.headers['user-agent'] ?? '';
    const parsedUserAgent = parser.setUA(userAgent).getResult();

    body.useragent = parsedUserAgent as unknown as Record<string, unknown>;

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
