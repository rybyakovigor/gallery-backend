// Core
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

// Services
import { MaterialsService } from './materials.service';

// Pipes
import { UuidV6ValidationPipe } from '../core/pipes/validate-uuidv6.pipe';

// DTO
import { CreateOrUpdateMaterialDto } from './dto/create-or-update-material.dto';

// Types
import { Material } from './types/material';

@Controller('materials')
export class MaterialsController {
  public constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  public async findAll(): Promise<Material[]> {
    return this.materialsService.findAll();
  }

  @Get(':id')
  public async findById(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<Material> {
    return this.materialsService.findById(id);
  }

  @Post()
  public async create(@Body() body: CreateOrUpdateMaterialDto): Promise<Material> {
    return this.materialsService.create(body);
  }

  @Put(':id')
  public async update(
    @Param('id', new UuidV6ValidationPipe()) id: string,
    @Body() body: CreateOrUpdateMaterialDto
  ): Promise<Material> {
    return this.materialsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<void> {
    return this.materialsService.delete(id);
  }
}
