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
import { FlashsalesService } from './flashsales.service';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { IFlashSale } from './flashsale.interface';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { USERS_ROLE_ENUM } from '../users/users.constant';
import { Roles } from '../auth/role.decorator';
import {
  BadRequestDto,
  ConFlictExceptionDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';
import { FlashSaleSwangger } from './dto/swangger/flash-sale-swangger.dto';
import { STATUS_ENUM } from '../shared/constants';
import { IFlashSaleModel } from './flashsale.schema';
import { StatusRespone } from 'src/shared/respone.dto';

@ApiTags('flashsales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('flashsales')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@ApiUnauthorizedResponse({
  type: UnauthorizedExceptionDto,
})
export class FlashsalesController {
  constructor(private readonly flashsalesService: FlashsalesService) {}

  // [POST] api/ecommerce/v1/flashsales
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @ApiCreatedResponse({
    type: FlashSaleSwangger,
    description: 'Flash sale created',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description:
      'startTime < Date.now or startTime > endTime, discount invalid, itemId not exist, stocks >= flashSaleQuantity  ',
  })
  @Post()
  create(
    @Body() createFlashsaleDto: CreateFlashsaleDto,
  ): Promise<IFlashSaleModel> {
    return this.flashsalesService.create(createFlashsaleDto);
  }

  // [GET] api/ecommerce/v1/flashsales
  @ApiOkResponse({
    type: [FlashSaleSwangger],
    description: 'Return list flash sale',
  })
  @ApiOperation({
    operationId: 'Get list FlashSale',
    description: 'Get list FlashSale',
  })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'perPage', type: Number, required: false, example: 25 })
  @ApiQuery({ name: 'sortBy', type: String, required: false })
  @ApiQuery({ name: 'name', type: String, required: false })
  @ApiQuery({ name: 'itemID', type: String, required: false })
  @ApiQuery({ name: 'startTime', type: Date, required: false })
  @ApiQuery({
    name: 'status',
    enum: STATUS_ENUM,
    required: false,
    example: STATUS_ENUM.ACTIVE,
  })
  @ApiQuery({
    name: 'sortType',
    enum: ['asc', 'desc'],
    required: false,
    example: 'desc',
  })
  @Roles(USERS_ROLE_ENUM.ADMIN, USERS_ROLE_ENUM.USER)
  @Get()
  getList(@Query() query) {
    return this.flashsalesService.getList(query);
  }

  // [PATCH] api/ecommerce/v1/flashsales/:id
  @ApiOkResponse({
    type: FlashSaleSwangger,
    description: 'Return flash sale updated',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Time update exists',
  })
  @Patch(':id')
  @Roles(USERS_ROLE_ENUM.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateFlashsaleDto: UpdateFlashsaleDto,
  ) {
    return this.flashsalesService.update(id, updateFlashsaleDto);
  }

  // [DELETE]
  @ApiOkResponse({ type: StatusRespone })
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashsalesService.remove(id);
  }
}
