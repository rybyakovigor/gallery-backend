// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const metricSchema = z.object({
  page: z.string(),
  ip: z.string().optional(),
  useragent: z.object({}).optional(),
  location: z.object({}).optional(),
});

export class CreateMetricDto extends createZodDto(metricSchema) {}
