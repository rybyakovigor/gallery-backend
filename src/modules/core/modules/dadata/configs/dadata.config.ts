import { HttpModuleOptions } from '@nestjs/axios';
import { AppConfigService } from '../../config/config.service';

export const getDadataConfig = async (configService: AppConfigService): Promise<HttpModuleOptions> => {
  const config = configService.config.dadata;
  return {
    baseURL: config.url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${config.apiKey}`,
    },
    maxRedirects: 5,
    timeout: 5000,
  };
};
