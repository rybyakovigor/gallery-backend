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
  .extend({
    email: email.optional(),
    phone: phone.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.email && !data.phone) {
      const result = email.safeParse(data.email);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: issue.path.length ? issue.path : ['email'],
          });
        });
      }
    } else if (!data.email && data.phone) {
      const result = phone.safeParse(data.phone);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: issue.path.length ? issue.path : ['phone'],
          });
        });
      }
    }
  });

export class CreateFeedbackDto extends createZodDto(FeedbackSchema) {
  public name: string;
  public email?: string;
  public phone?: string;
}
