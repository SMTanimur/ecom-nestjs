import { forwardRef, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Items, ItemsSchema } from './items.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsRepository } from './items.repository';
import { FlashsalesModule } from '../flashsales/flashsales.module';
import { CategorysModule } from 'src/categories/categories.module';

@Module({
  imports: [
    forwardRef(() => CategorysModule),
    FlashsalesModule,
    MongooseModule.forFeature([{ name: Items.name, schema: ItemsSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  exports: [ItemsService, ItemsRepository],
})
export class ItemsModule {}
