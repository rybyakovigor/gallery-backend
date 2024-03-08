// Core
import { createZodDto } from 'nestjs-zod';
import { WorkSchema } from './create-work.dto';

const UpdateWorkSchema = WorkSchema.partial();

export class UpdateWorkDto extends createZodDto(UpdateWorkSchema) {}
