// Core
import { FramingType as FramingTypeType, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface FramingType extends FramingTypeType {}

export interface FramingTypeRepository extends Prisma.FramingTypeDelegate<DefaultArgs> {}
