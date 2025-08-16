// Core
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Repositories
import { WorksRepository } from '../works.repository';

// Types
import { Work } from '../types/work';

// Services
import { FilesService } from '@/modules/files/services/files.service';

// Dto
import { CreateWorkDto } from '../dto/create-work.dto';
import { UpdateWorkDto } from '../dto/update-work.dto';

// Utils
import { russianToTranslit } from '@/modules/core/utils';

@Injectable()
export class WorksService {
  public constructor(
    private readonly repository: WorksRepository,
    private readonly filesService: FilesService
  ) {}

  public async findAll(): Promise<Work[]> {
    return this.repository.findAll();
  }

  public async findAllForGallery(limit?: string): Promise<Work[]> {
    return this.repository.findAll({ is_active: true }, { created_at: 'desc' }, limit);
  }

  public async create(body: CreateWorkDto): Promise<Work> {
    this.checkImages(body);
    const data = {
      title: body.title.trim(),
      slug: russianToTranslit(body.title),
      description: body.description,
      width: body.width,
      height: body.height,
      price: body.price,
      is_sold: body.is_sold,
      is_active: body.is_active,
      framing_types: {
        create: body.framing_types.map((item) => ({ framing_type: { connect: { id: item } } })),
      },
      materials: {
        create: body.materials.map((item) => ({ material: { connect: { id: item } } })),
      },
      images: {
        create: body.images.map((item, index) => ({ file: { connect: { id: item } }, order: index })),
      },
    };
    return this.repository.create(data);
  }

  public async findById(id: string): Promise<Work> {
    const row = await this.repository.findById(id);
    if (!row) {
      throw new NotFoundException(`Work with id ${id} not found`);
    }
    return row;
  }

  public async update(id: string, body: UpdateWorkDto): Promise<Work> {
    this.checkImages(body);
    const work = await this.findById(id);
    const data: Prisma.WorkUpdateInput = {
      title: body.title?.trim(),
      description: body.description,
      width: body.width,
      height: body.height,
      price: body.price,
      is_sold: body.is_sold,
      is_active: body.is_active,
    };

    if (body.title) {
      data.slug = russianToTranslit(body.title);
    }

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

    let imagesToDelete: Work['images'] = [];
    if (body.images) {
      const currentImages = work.images!;
      const currentImageIds = currentImages.map((image) => image.file!.id);

      imagesToDelete = currentImages.filter((image) => !body.images!.includes(image.file!.id));

      const imagesWithOrder = body.images.map((imageId, index) => ({ id: imageId, order: index }));

      const newImages = imagesWithOrder.filter((image) => !currentImageIds.includes(image.id));
      const imagesToUpdate = imagesWithOrder
        .filter((image) => currentImageIds.includes(image.id))
        .map((image) => {
          const workImage = currentImages.find((ci) => ci.file!.id === image.id);
          return {
            where: { id: workImage!.id },
            data: { order: image.order },
          };
        });

      Object.assign<Prisma.WorkUpdateInput, Prisma.WorkUpdateInput>(data, {
        images: {
          deleteMany: imagesToDelete.map((image) => ({ id: image.id })),
          create: newImages.map((image) => ({ file: { connect: { id: image.id } }, order: image.order })),
          update: imagesToUpdate,
        },
      });
    }

    const result = await this.repository.update(id, data);

    await Promise.all(imagesToDelete.map((image) => this.filesService.deleteFromStorage(image.file!.key)));

    return result;
  }

  public async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }

  private checkImages(work: CreateWorkDto | UpdateWorkDto): void {
    if (!work.images?.length && work.is_active) {
      throw new BadRequestException('Active work should be done with the image');
    }
  }
}
