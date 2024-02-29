// Core
import { Module } from '@nestjs/common';

// Services
import { S3Service } from './s3.service';

@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
