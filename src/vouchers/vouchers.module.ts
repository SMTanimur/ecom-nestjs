import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { VouchersRepository } from './vouchers.repository';
import { Voucher, VoucherSchema } from './voucher.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorysModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Voucher.name, schema: VoucherSchema }]),
    CategorysModule,
  ],
  controllers: [VouchersController],
  providers: [VouchersService, VouchersRepository],
  exports: [VouchersService, VouchersRepository],
})
export class VouchersModule {}
