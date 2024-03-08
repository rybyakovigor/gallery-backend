// Core
import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface Config {
  databaseUrl: string;
  s3: {
    accessKey: string;
    secretKey: string;
    endpointUrl: string;
  };
}

const DATABASE_URL = 'DATABASE_URL';
const ACCESS_KEY = 'ACCESS_KEY';
const SECRET_KEY = 'SECRET_KEY';
const ENDPOINT_URL = 'ENDPOINT_URL';

@Global()
@Injectable()
export class AppConfigService {
  private requiredVars: string[];
  public constructor(private configService: ConfigService) {
    this.requiredVars = [DATABASE_URL, ACCESS_KEY, SECRET_KEY, ENDPOINT_URL];
    this.validateRequiredVariables();
  }

  private validateRequiredVariables(): void {
    const missingVars = this.requiredVars.filter((key) => !this.configService.get(key));

    if (missingVars.length) {
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }
  }

  public get config(): Config {
    return {
      databaseUrl: this.configService.get(DATABASE_URL) as string,
      s3: {
        accessKey: this.configService.get(ACCESS_KEY) as string,
        secretKey: this.configService.get(SECRET_KEY) as string,
        endpointUrl: this.configService.get(ENDPOINT_URL) as string,
      },
    };
  }
}
