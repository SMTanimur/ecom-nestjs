import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersRepository } from './order.repository';
import { UsersModule } from '../users/users.module';
import { FlashsalesModule } from '../flashsales/flashsales.module';
import { VouchersModule } from '../vouchers/vouchers.module';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
    FlashsalesModule,
    VouchersModule,
    ItemsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
