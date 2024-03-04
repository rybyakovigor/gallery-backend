import { File as FileType, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface File extends FileType {}

export interface FileRepository extends Prisma.FileDelegate<DefaultArgs> {}
