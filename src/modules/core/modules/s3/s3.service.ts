// Core
import { Injectable } from '@nestjs/common';
import { AWSError, S3 } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class S3Service {
  private readonly bucket: string;
  private readonly s3: S3;

  public constructor(private readonly configService: AppConfigService) {
    this.s3 = new S3({
      endpoint: configService.config.s3.endpointUrl,
      accessKeyId: configService.config.s3.accessKey,
      secretAccessKey: configService.config.s3.secretKey,
      // Для работы с локальным s3
      s3ForcePathStyle: true,
    });

    this.bucket = 'root';

    void this.startupBucketCheck();
  }

  public async createBucket(bucketName: string): Promise<PromiseResult<S3.CreateBucketOutput, AWSError>> {
    const createdBucket: PromiseResult<S3.CreateBucketOutput, AWSError> = await this.s3
      .createBucket({
        Bucket: bucketName,
        // eslint-disable-next-line sonarjs/no-duplicate-string
        ACL: 'public-read',
      })
      .promise();

    return createdBucket;
  }

  public async deleteBucket(bucketName: string): Promise<void> {
    await this.s3.deleteBucket({ Bucket: bucketName }).promise();
  }

  public async checkBucketExists(bucketName: string): Promise<boolean | void> {
    try {
      await this.s3.headBucket({ Bucket: bucketName }).promise();

      return true;
    } catch (error) {
      if ((error as AWSError).statusCode && (error as AWSError).statusCode === 404) {
        return false;
      }
      console.error(error);
    }
  }

  public async uploadFile(
    key: string,
    fileBuffer: S3.Body,
    mimeType: string,
    bucketName: string = this.bucket
  ): Promise<S3.ManagedUpload.SendData> {
    return await this.s3
      .upload({
        Bucket: bucketName,
        Body: fileBuffer,
        Key: key,
        ACL: 'public-read',
        ContentType: mimeType,
      })
      .promise();
  }

  public async deleteFile(key: string, bucketName: string = this.bucket): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise();
  }

  private async startupBucketCheck(): Promise<void> {
    const result: boolean | void = await this.checkBucketExists(this.bucket);
    if (result === false) {
      await this.createBucket(this.bucket);
    }
  }

  public async getAllObjects(prefix: string, bucketName: string = this.bucket): Promise<S3.ObjectList | undefined> {
    const response: PromiseResult<S3.ListObjectsV2Output, AWSError> = await this.s3
      .listObjectsV2({ Bucket: bucketName, Prefix: prefix })
      .promise();
    return response.Contents;
  }

  public async getObjectByKey(
    key: string,
    bucketName: string = this.bucket
  ): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    return await this.s3.getObject({ Bucket: bucketName, Key: key }).promise();
  }
}
