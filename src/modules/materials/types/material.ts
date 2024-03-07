// Core
import { Material as MaterialType, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface Material extends MaterialType {}

export interface MaterialRepository extends Prisma.MaterialDelegate<DefaultArgs> {}
