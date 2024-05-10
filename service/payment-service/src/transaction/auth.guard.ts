import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Checks the presence of a valid token in the request header and verifies it using the JWT service before granting access.
   * @param {ExecutionContext} context - represents the execution context of the current request being processed.
   * It provides access to request and response objects, among other things, allows you to interact with incoming requests and control the request processing pipeline.
   * @returns boolean value. In this case, it returns `true` if the token is successfully verified and the user payload is set on the request object.
   * If there is no token or verification fails, will throw `UnauthorizedException`.
   */

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;
      request['token'] = token;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * The `extractTokenFromHeader` function retrieves the token from the HTTP request header.
   * @param {Request} request - The `request` parameter is the HTTP request object.
   * @returns Token from request header if available, otherwise return `undefined`.
   */

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
