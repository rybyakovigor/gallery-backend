// Core
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

// Services
import { AppConfigService } from '../modules/config/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly configService: AppConfigService) {}
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['auth'];

    if (!authHeader || !this.validateAuthKey(authHeader)) {
      throw new UnauthorizedException('Invalid or missing authentication key');
    }

    return true;
  }

  private validateAuthKey(authKey: string): boolean {
    const secretKey = this.configService.config.authSecretKey;
    return authKey === secretKey;
  }
}
