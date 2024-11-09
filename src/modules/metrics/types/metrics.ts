// Core
import { Metric as MetricType, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface Metric extends MetricType {}

export interface MetricRepository extends Prisma.MetricDelegate<DefaultArgs> {}
