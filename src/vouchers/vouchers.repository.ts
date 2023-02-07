import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { IVoucherModel, Voucher } from './voucher.schema';

import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VouchersRepository extends BaseRepository<IVoucherModel> {
  constructor(
    @InjectModel(Voucher.name)
    model: PaginateModel<IVoucherModel>,
  ) {
    super(<PaginateModel<IVoucherModel>>model);
  }
}
