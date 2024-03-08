// Core
import { Injectable, NotFoundException } from '@nestjs/common';

// Repositories
import { WorksRepository } from './works.repository';

// Types
import { Work } from './types/work';

// Dto
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@Injectable()
export class WorksService {
  public constructor(private readonly repository: WorksRepository) {}

  public async findAll(): Promise<Work[]> {
    return this.repository.findAll();
  }

  public async create(body: CreateWorkDto): Promise<Work> {
    const data = {
      title: body.title,
      description: body.description,
      width: body.width,
      height: body.height,
      price: body.price,
      framing_types: {
        create: body.framing_types.map((item) => ({ framing_type: { connect: { id: item } } })),
      },
      materials: {
        create: body.materials.map((item) => ({ material: { connect: { id: item } } })),
      },
      images: {
        create: body.images.map((item) => ({ file: { connect: { id: item } } })),
      },
    };
    return await this.repository.create(data);
  }

  public async findById(id: string): Promise<Work> {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new NotFoundException(`Work with id ${id} not found`);
    }
    return row;
  }

  public async update(id: string, body: UpdateWorkDto): Promise<Work> {
    await this.findById(id);
    const data = {
      title: body.title,
      description: body.description,
      width: body.width,
      height: body.height,
      price: body.price,
      is_sold: body.is_sold,
    };

    if (body.framing_types) {
      Object.assign(data, {
        framing_types: {
          deleteMany: {},
          create: body.framing_types.map((item) => ({ framing_type: { connect: { id: item } } })),
        },
      });
    }

    if (body.materials) {
      Object.assign(data, {
        materials: {
          deleteMany: {},
          create: body.materials.map((item) => ({ material: { connect: { id: item } } })),
        },
      });
    }

    if (body.images) {
      Object.assign(data, {
        images: {
          deleteMany: {},
          create: body.images.map((item) => ({ file: { connect: { id: item } } })),
        },
      });
    }

    return this.repository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
