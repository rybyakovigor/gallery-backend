// Core
import { Injectable, NotFoundException } from '@nestjs/common';

// Repositories
import { FramingTypesRepository } from './framing-types.repository';

// Types
import { FramingType } from './types/framing-type';

// Dto
import { CreateOrUpdateFramingTypeDto } from './dto/create-or-update-framing-type.dto';

@Injectable()
export class FramingTypesService {
  public constructor(private readonly repository: FramingTypesRepository) {}

  public async findAll(): Promise<FramingType[]> {
    return this.repository.findAll();
  }

  public async create(body: CreateOrUpdateFramingTypeDto): Promise<FramingType> {
    return await this.repository.create(body);
  }

  public async findById(id: string): Promise<FramingType> {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new NotFoundException(`Framing type with id ${id} not found`);
    }
    return row;
  }

  public async update(id: string, body: CreateOrUpdateFramingTypeDto): Promise<FramingType> {
    await this.findById(id);
    return this.repository.update(id, body);
  }

  public async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
