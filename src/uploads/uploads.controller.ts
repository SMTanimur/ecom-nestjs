import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';
import {
  BadRequestDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';
import { imageFileFilter } from '../users/multer/multer.config';
import { USERS_ROLE_ENUM } from '../users/users.constant';
import { NewFileDetailDto } from './dto/new-file-detail.dto';
import { UploadSwanggerDto } from './dto/upload-swangger.dto';
import { UploadsService } from './uploads.service';

@ApiTags('uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(USERS_ROLE_ENUM.ADMIN)
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@ApiUnauthorizedResponse({
  type: UnauthorizedExceptionDto,
  description: 'login with non-admin rights',
})
@ApiOkResponse({ type: UploadSwanggerDto })
@ApiBadRequestResponse({
  type: BadRequestDto,
  description: 'bucketPath not empty',
})
@Controller('uploads')
export class UploadsController {
  constructor(readonly uploadService: UploadsService) {}
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bucketPath: { type: 'string' },
        image: {
          type: 'file',
          format: 'binary',
        },
        imageDetails: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  })
  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'imageDetails', maxCount: 3 },
      ],
      { fileFilter: imageFileFilter },
    ),
  )
  async upload(
    @UploadedFiles() files: Express.Multer.File,
    @Body() fileDetail: NewFileDetailDto,
  ) {
    return await this.uploadService.upload(files, fileDetail.bucketPath);
  }
}
