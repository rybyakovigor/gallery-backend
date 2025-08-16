// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const FramingTypeSchema = z.object({
  title: z.string(),
});

export type CreateOrUpdateFramingTypeDtoType = z.infer<typeof FramingTypeSchema>;

export class CreateOrUpdateFramingTypeDto extends createZodDto(FramingTypeSchema) {
  public title: string;
}
