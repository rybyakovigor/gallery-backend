import * as crypto from 'crypto';

export const generateFileKey = (file: Express.Multer.File): string => {
  return `${crypto.randomUUID()}.${file.originalname.split('.').pop()}`;
};
