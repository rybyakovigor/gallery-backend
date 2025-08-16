// Core
import { Injectable } from '@nestjs/common';

// Repositories
import { WorksRepository } from '../works.repository';

// Utils
import { russianToTranslit } from '@/modules/core/utils';

@Injectable()
export class WorksDevelopService {
  public constructor(private readonly repository: WorksRepository) {}

  public async updateTitlesAndSlugs(): Promise<void> {
    const works = await this.repository.findAll();
    for (const work of works) {
      const title = work.title.replaceAll('"', '').trim();
      const slug = russianToTranslit(title);
      await this.repository.update(work.id, { title, slug });
    }
  }
}
