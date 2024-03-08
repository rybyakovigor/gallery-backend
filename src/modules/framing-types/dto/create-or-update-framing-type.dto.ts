// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const FramingTypeSchema = z.object({
  title: z.string(),
});

export class CreateOrUpdateFramingTypeDto extends createZodDto(FramingTypeSchema) {}
