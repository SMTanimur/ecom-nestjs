import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BaseRepository } from '../base/base.repository';
import { FlashSale, IFlashSaleModel } from './flashsale.schema';

@Injectable()
export class FlashSaleRepository extends BaseRepository<IFlashSaleModel> {
  constructor(
    @InjectModel(FlashSale.name)
    model: PaginateModel<IFlashSaleModel>,
  ) {
    super(<PaginateModel<IFlashSaleModel>>model);
  }
}
