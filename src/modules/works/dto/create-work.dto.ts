// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const WorkSchema = z.object({
  title: z.string().max(120),
  description: z.string(),
  width: z.number().int(),
  height: z.number().int(),
  price: z.number().int(),
  is_sold: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(false),
  framing_types: z.array(z.string()),
  images: z.array(z.string()),
  materials: z.array(z.string()),
});

export class CreateWorkDto extends createZodDto(WorkSchema) {}
