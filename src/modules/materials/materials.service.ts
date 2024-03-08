// Core
import { Injectable, NotFoundException } from '@nestjs/common';
import { MaterialsRepository } from './materials.repository';

// Types
import { Material } from './types/material';

// Dto
import { CreateOrUpdateMaterialDto } from './dto/create-or-update-material.dto';

@Injectable()
export class MaterialsService {
  public constructor(private readonly repository: MaterialsRepository) {}

  public async findAll(): Promise<Material[]> {
    return this.repository.findAll();
  }

  public async create(body: CreateOrUpdateMaterialDto): Promise<Material> {
    return await this.repository.create(body);
  }

  public async findById(id: string): Promise<Material> {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new NotFoundException(`Material with id ${id} not found`);
    }
    return row;
  }

  public async update(id: string, body: CreateOrUpdateMaterialDto): Promise<Material> {
    await this.findById(id);
    return this.repository.update(id, body);
  }

  public async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
