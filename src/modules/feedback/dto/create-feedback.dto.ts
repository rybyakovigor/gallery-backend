// Core
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const name = z.string().max(60).min(1).trim();
const email = z.string().email().max(60).trim();
const phone = z
  .string()
  .regex(/^(8|\+7)[-\s]?\(?9\d{2}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/)
  .trim();

export const FeedbackSchema = z
  .object({
    name,
  })
  .merge(
    z.object({
      email: email.optional(),
    })
  )
  .merge(
    z.object({
      phone: phone.optional(),
    })
  )
  .superRefine((data, ctx) => {
    if (data.email && !data.phone) {
      // Проверка только email, если phone не предоставлен
      const result = email.safeParse(data.email);
      if (!result.success) {
        result.error.errors.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: issue.path || ['email'],
          });
        });
      }
    } else if (!data.email && data.phone) {
      // Проверка только phone, если email не предоставлен
      const result = phone.safeParse(data.phone);
      if (!result.success) {
        result.error.errors.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: issue.path || ['phone'],
          });
        });
      }
    }
  });

export class CreateFeedbackDto extends createZodDto(FeedbackSchema) {}
