import { BadRequestException } from '@nestjs/common';

export function responeErrorMongoDB(error) {
  const keys = Object.keys(error.keyValue);

  if (error.code === 11000) {
    throw new BadRequestException(`Please use another ${keys[0]}`);
  }
  return error;
}
