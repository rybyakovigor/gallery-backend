// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const metricSchema = z.object({
  page: z.string(),
  ip: z.string().optional(),
  useragent: z.json().optional(),
});

export class CreateMetricDto extends createZodDto(metricSchema) {}
