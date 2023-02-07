import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../base/base.repository';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IItemModel, Items } from './items.schema';

@Injectable()
export class ItemsRepository extends BaseRepository<IItemModel> {
  constructor(
    @InjectModel(Items.name)
    model: PaginateModel<IItemModel>,
  ) {
    super(<PaginateModel<IItemModel>>model);
  }
}
