// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

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

export type CreateWorkDtoType = z.infer<typeof WorkSchema>;

export class CreateWorkDto extends createZodDto(WorkSchema) {
  public title: string;
  public description: string;
  public width: number;
  public height: number;
  public price: number;
  public is_sold?: boolean;
  public is_active?: boolean;
  public framing_types: string[];
  public images: string[];
  public materials: string[];
}
