// Core
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageHandlingService {
  private readonly MAX_DIMENSION: number = 3000;
  private readonly SIZE_LIMIT: number = 0.7 * 1024 * 1024; // 0.7 MB в байтах
  private readonly QUALITY: number = 75;
  private readonly QUALITY_LIMIT: number = 5;

  public async resizeAndConvertToWebp(image: Express.Multer.File): Promise<Express.Multer.File> {
    try {
      const buffer: Buffer = Buffer.from(image.buffer as unknown as string, 'binary');
      const handlingImage: sharp.Sharp = sharp(buffer);
      const metadata: sharp.Metadata = await handlingImage.metadata();

      if (metadata.width && metadata.height) {
        const { width, height } = this.calculateResizedDimensions(metadata.width, metadata.height);
        handlingImage.resize(width, height, { fit: 'inside' }).withMetadata(); // withMetadata() для сохранения ориентации изображения
      }

      const processedImageBuffer: Buffer = await this.reduceQuality(handlingImage);
      const { filename, mimeType } = this.generateMimeTypeAndName(image.originalname, 'webp');

      const processedImage: Express.Multer.File = {
        ...image,
        buffer: processedImageBuffer,
        mimetype: mimeType,
        originalname: filename,
      };

      return processedImage;
    } catch (error) {
      throw new Error(`Error when handling image: ${error.message}`);
    }
  }

  private calculateResizedDimensions(width: number, height: number): { width: number; height: number } {
    const maxDimension: number = this.MAX_DIMENSION;

    if (width > maxDimension || height > maxDimension) {
      return width >= height
        ? { width: maxDimension, height: Math.round((maxDimension * height) / width) }
        : { width: Math.round((maxDimension * width) / height), height: maxDimension };
    }

    return { width, height };
  }

  private async reduceQuality(image: sharp.Sharp): Promise<Buffer> {
    let currentQuality: number = this.QUALITY;

    while (currentQuality > this.QUALITY_LIMIT) {
      const processedImageBuffer: Buffer = await image.webp({ quality: currentQuality }).toBuffer();
      const currentSize: number = processedImageBuffer.byteLength;

      if (currentSize <= this.SIZE_LIMIT) {
        return processedImageBuffer;
      }

      currentQuality -= 5;
    }

    return await image.toBuffer();
  }

  private generateMimeTypeAndName(fileName: string, newFormat: string): { mimeType: string; filename: string } {
    const originalFileName: string = fileName.split('.').slice(0, -1).join('.');
    const newFileName: string = `${originalFileName}.${newFormat}`;
    const newMimeType: string = `image/${newFormat}`;

    return { mimeType: newMimeType, filename: newFileName };
  }
}
