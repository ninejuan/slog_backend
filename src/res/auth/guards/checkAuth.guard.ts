import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

async function getSlogTkn(headers) {
  let cIndex = headers.indexOf('Cookie');
  if (cIndex !== -1) {
    let cookie = headers[cIndex + 1];
    const match = cookie.match(/slogtkn=([^;]+)/);
    if (match) {
      return cookie;
    }
  }
  return null;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    let slogTkn = getSlogTkn(request.rawHeaders)
    if (!slogTkn) {
      response.redirect('/auth/google/cb');
      return false;
    }
    return true;
  }
}