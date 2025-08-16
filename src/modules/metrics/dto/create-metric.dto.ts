// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const metricSchema = z.object({
  page: z.string(),
  ip: z.string().optional(),
  useragent: z.record(z.string(), z.any()).optional(),
  location: z.record(z.string(), z.any()).optional(),
});

export type CreateMetricDtoType = z.infer<typeof metricSchema>;

export class CreateMetricDto extends createZodDto(metricSchema) {
  public page!: string;
  public ip?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public useragent?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public location?: Record<string, any>;
}
