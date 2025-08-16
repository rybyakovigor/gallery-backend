// Core
import { createZodDto } from 'nestjs-zod';
import { WorkSchema } from './create-work.dto';
import { z } from 'zod';

const UpdateWorkSchema = WorkSchema.partial();

export type UpdateWorkDtoType = Partial<z.infer<typeof WorkSchema>>;

export class UpdateWorkDto extends createZodDto(UpdateWorkSchema) {
  public title?: string;
  public description?: string;
  public width?: number;
  public height?: number;
  public price?: number;
  public is_sold?: boolean;
  public is_active?: boolean;
  public framing_types?: string[];
  public images?: string[];
  public materials?: string[];
}
