// Core
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';

// Services
import { WorksService } from './works.service';

// Pipes
import { UuidV6ValidationPipe } from '../core/pipes/validate-uuidv6.pipe';

// DTO
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

// Types
import { Work } from './types/work';

// Guards
import { AuthGuard } from '../core/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('works')
export class WorksController {
  public constructor(private readonly service: WorksService) {}

  @Get()
  public async findAll(): Promise<Work[]> {
    return this.service.findAll();
  }

  @Get(':id')
  public async findById(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<Work> {
    return this.service.findById(id);
  }

  @Post()
  public async create(@Body() body: CreateWorkDto): Promise<Work> {
    return this.service.create(body);
  }

  @Put(':id')
  public async update(@Param('id', new UuidV6ValidationPipe()) id: string, @Body() body: UpdateWorkDto): Promise<Work> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', new UuidV6ValidationPipe()) id: string): Promise<void> {
    return this.service.delete(id);
  }
}
