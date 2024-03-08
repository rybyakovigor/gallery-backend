// Core
import { Work as WorkType, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

// Types
import { FramingType } from '@/modules/framing-types/types/framing-type';
import { Material } from '@/modules/materials/types/material';
import { File } from '@/modules/files/types/file';

export interface Work extends WorkType {
  materials?: { material: Material }[];
  framing_types?: { framing_type: FramingType }[];
  images?: { file: File | null }[];
}

export interface WorkRepository extends Prisma.WorkDelegate<DefaultArgs> {}
