import { HttpStatus } from '@nestjs/common';

export interface IGeneralErrorShape {
  message: string;
  errorCode: string;
  code: string;
  statusCode: HttpStatus;
}
