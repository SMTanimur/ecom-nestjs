import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { IOrderModel, Order } from './order.schema';

@Injectable()
export class OrdersRepository extends BaseRepository<IOrderModel> {
  constructor(
    @InjectModel(Order.name)
    model: PaginateModel<IOrderModel>,
  ) {
    super(<PaginateModel<IOrderModel>>model);
  }
}
