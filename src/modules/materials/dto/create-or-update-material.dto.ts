// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const MaterialSchema = z.object({
  title: z.string(),
});

export class CreateOrUpdateMaterialDto extends createZodDto(MaterialSchema) {}
