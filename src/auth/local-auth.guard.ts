import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (err || !user) {
      if (!email) {
        throw new BadRequestException('Email is required');
      }
      if (!password) {
        throw new BadRequestException('Password is required');
      }
      throw new BadRequestException('Email or password invalid');
    }
    return user;
  }
}
