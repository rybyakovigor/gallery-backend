// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const MaterialSchema = z.object({
  title: z.string(),
});

export type CreateOrUpdateMaterialDtoType = z.infer<typeof MaterialSchema>;

export class CreateOrUpdateMaterialDto extends createZodDto(MaterialSchema) {
  public title: string;
}
