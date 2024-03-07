// Core
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UuidV6ValidationPipe implements PipeTransform<string> {
  public transform(value: string): string {
    const uuidV6Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-6[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!isUUID(value) || !uuidV6Regex.test(value)) {
      throw new BadRequestException('Invalid id format');
    }

    return value;
  }
}
