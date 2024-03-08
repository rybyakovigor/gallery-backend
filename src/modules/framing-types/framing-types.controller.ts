// Core
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

// Services
import { FramingTypesService } from './framing-types.service';

// Pipes
import { UuidV6ValidationPipe } from '../core/pipes/validate-uuidv6.pipe';

// DTO
import { CreateOrUpdateFramingTypeDto } from './dto/create-or-update-framing-type.dto';

// Types
import { FramingType } from './types/framing-type';

@Controller('framing-types')
export class FramingTypesController {
  public constructor(private readonly service: FramingTypesService) {}

  @Get()
  public async findAll(): Promise<FramingType[]> {
    return this.service.findAll();
  }

  @Get(':id')
  public async findById(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<FramingType> {
    return this.service.findById(id);
  }

  @Post()
  public async create(@Body() body: CreateOrUpdateFramingTypeDto): Promise<FramingType> {
    return this.service.create(body);
  }

  @Put(':id')
  public async update(
    @Param('id', new UuidV6ValidationPipe()) id: string,
    @Body() body: CreateOrUpdateFramingTypeDto
  ): Promise<FramingType> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<void> {
    return this.service.delete(id);
  }
}
