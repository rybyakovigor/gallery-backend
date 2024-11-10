// Core
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';

// Types
import { FindCityByIpResponse } from './types/findCityByIp.response';

@Injectable()
export class DadataService {
  public constructor(private readonly httpService: HttpService) {}

  public async findCityByIp(ip: string): Promise<FindCityByIpResponse> {
    const body = {
      ip,
    };

    const stream$ = this.httpService.post<FindCityByIpResponse>('/iplocate/address', body).pipe(
      map((response) => {
        return response.data;
      }),
      catchError(async (error) => {
        throw new HttpException(error.response.statusText, error.response.status);
      })
    );
    return firstValueFrom(stream$);
  }
}
