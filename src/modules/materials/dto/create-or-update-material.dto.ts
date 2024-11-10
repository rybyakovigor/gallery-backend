// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const MaterialSchema = z.object({
  title: z.string(),
});

export class CreateOrUpdateMaterialDto extends createZodDto(MaterialSchema) {}
