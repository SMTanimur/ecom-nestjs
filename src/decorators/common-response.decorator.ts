import { applyDecorators, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ErrorModelDto } from '../errors/errrors.dto';

export function ApiCommonResponse() {
  return applyDecorators(
    HttpCode(200),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: ErrorModelDto,
    }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorModelDto }),
    ApiBadRequestResponse({
      description: 'Something error in business',
      type: ErrorModelDto,
    }),
    ApiServiceUnavailableResponse({
      description: 'Service Unavailable',
      type: ErrorModelDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server Error',
      type: ErrorModelDto,
    }),
    ApiNotFoundResponse({ description: 'Not found', type: ErrorModelDto }),
  );
}
