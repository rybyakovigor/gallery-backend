// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const FramingTypeSchema = z.object({
  title: z.string(),
});

export class CreateOrUpdateFramingTypeDto extends createZodDto(FramingTypeSchema) {}
