// Core
import { Feedback as FeedbackType, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface Feedback extends FeedbackType {}

export interface FeedbackRepository extends Prisma.FeedbackDelegate<DefaultArgs> {}
