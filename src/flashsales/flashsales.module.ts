import { forwardRef, Module } from '@nestjs/common';
import { FlashsalesService } from './flashsales.service';
import { FlashsalesController } from './flashsales.controller';
import { FlashSale, FlashSaleSchema } from './flashsale.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSaleRepository } from './flashsales.repository';
import { UsersModule } from '../users/users.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FlashSale.name, schema: FlashSaleSchema },
    ]),
    UsersModule,
    forwardRef(() => ItemsModule),
  ],
  controllers: [FlashsalesController],
  providers: [FlashsalesService, FlashSaleRepository],
  exports: [FlashsalesService, FlashSaleRepository],
})
export class FlashsalesModule {}
