// Core
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { z } from 'zod';

const ERROR_MESSAGE = 'Invalid id format';

@Injectable()
export class UuidV6ValidationPipe implements PipeTransform<string> {
  private readonly schema = z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-6[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, ERROR_MESSAGE);

  public transform(value: string): string {
    try {
      return this.schema.parse(value);
    } catch {
      throw new BadRequestException(ERROR_MESSAGE);
    }
  }
}
