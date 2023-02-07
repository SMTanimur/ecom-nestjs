import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IVoucher } from './entities/voucher.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { USERS_ROLE_ENUM } from '../users/users.constant';
import { VoucherSwanggerDto } from './dto/swangger/voucher-swangger.dto';
import {
  BadRequestDto,
  ConFlictExceptionDto,
  InternalServerErrorExceptionDto,
  NotFoundExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';

@ApiTags('vouchers')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  // [POST] CREATE
  @ApiCreatedResponse({
    type: VoucherSwanggerDto,
    description: 'Return new voucher',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'login with non-admin rights',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description:
      'startTime must be future and startTime < endTime, category doesnt exist',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Code voucher already exist',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto): Promise<IVoucher> {
    return this.vouchersService.create(createVoucherDto);
  }

  // [GET] get List
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USERS_ROLE_ENUM.ADMIN, USERS_ROLE_ENUM.USER)
  @ApiOkResponse({
    description: 'Return list voucher',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'Need to login',
  })
  @ApiOperation({
    operationId: 'GetVoucher',
    description: 'Get list voucher',
  })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'perPage', type: Number, required: false, example: 25 })
  @ApiQuery({ name: 'sortBy', type: String, required: false })
  @ApiQuery({ name: 'startTime', type: Date, required: false })
  @ApiQuery({ name: 'endTime', type: Number, required: false })
  @ApiQuery({ name: 'discount', type: String, required: false })
  @ApiQuery({ name: 'categories', type: String, required: false })
  @ApiQuery({ name: 'nameVoucher', type: String, required: false })
  @ApiQuery({ name: 'code', type: String, required: false })
  @ApiQuery({
    name: 'sortType',
    enum: ['asc', 'desc'],
    required: false,
    example: 'desc',
  })
  @Get()
  getList(@Query() query) {
    return this.vouchersService.getList(query);
  }

  // [GET] find one
  @ApiOkResponse({
    type: VoucherSwanggerDto,
    description: 'Return voucher finded by id',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'Need to login',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Id must format ObjId',
  })
  @ApiNotFoundResponse({
    type: NotFoundExceptionDto,
    description: 'voucher does not exist',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USERS_ROLE_ENUM.ADMIN, USERS_ROLE_ENUM.USER)
  @Get(':voucherId')
  findOne(@Param('voucherId') voucherId: string): Promise<IVoucher> {
    return this.vouchersService.findOne(voucherId);
  }

  // [PATCH]
  @ApiOkResponse({ type: VoucherSwanggerDto })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'need to login with admin rights',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @Patch(':voucherId')
  update(
    @Param('voucherId') voucherId: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return this.vouchersService.update(voucherId, updateVoucherDto);
  }

  @ApiOkResponse({ type: Boolean })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'need to login with admin rights',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @Delete(':voucherId')
  remove(@Param('voucherId') voucherId: string): Promise<boolean> {
    return this.vouchersService.remove(voucherId);
  }
}
