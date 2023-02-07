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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
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
import {
  BadRequestDto,
  ConFlictExceptionDto,
  InternalServerErrorExceptionDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';
import { Roles } from '../auth/role.decorator';
import { USERS_ROLE_ENUM } from '../users/users.constant';
import { ItemSwangger } from './dto/swangger/item-swangger.dto';
import { ApiCommonResponse } from 'src/decorators/common-response.decorator';
import { IItemModel } from './items.schema';
import { StatusRespone } from 'src/shared/respone.dto';

@Controller('items')
@ApiTags('items')
@ApiInternalServerErrorResponse({
  type: InternalServerErrorExceptionDto,
  description: 'Server error',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // [POST] /api/ecommerce/v1/items
  @ApiCreatedResponse({
    type: ItemSwangger,
    description: 'return item created',
  })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Email or barcode already exist',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'name, barcode, cost, price, image not empty',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
  })
  @ApiBearerAuth()
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<IItemModel> {
    return this.itemsService.create(createItemDto);
  }

  // [GET] /api/ecommerce/v1/items
  @ApiCommonResponse()
  @ApiOperation({
    operationId: 'GetListUsers',
    description: 'Get list Facebook Users info',
  })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'perPage', type: Number, required: false, example: 25 })
  @ApiQuery({ name: 'sortBy', type: String, required: false })
  @ApiQuery({ name: 'itemName', type: String, required: false })
  @ApiQuery({ name: 'price', type: Number, required: false })
  @ApiQuery({ name: 'category', type: String, required: false })
  @ApiQuery({ name: 'barCode', type: String, required: false })
  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({
    name: 'sortType',
    enum: ['asc', 'desc'],
    required: false,
    example: 'desc',
  })
  @Get('')
  getList(@Query() query) {
    return this.itemsService.getList(query);
  }

  // [PATCH] /api/ecommerce/v1/items/:itemID
  @ApiOkResponse({ type: ItemSwangger, description: 'return item updated' })
  @ApiConflictResponse({
    type: ConFlictExceptionDto,
    description: 'Name item or barcode already exist',
  })
  @ApiBearerAuth()
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  // [DELETE] /api/ecommerce/v1/items/:itemID
  @ApiOkResponse({ type: StatusRespone })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Item sold > 0 ,Id not valid',
  })
  @ApiBearerAuth()
  @Roles(USERS_ROLE_ENUM.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
