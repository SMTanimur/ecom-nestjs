import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { STATUS_FLASHSALE_ENUM } from './flashsale.constain';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { async } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type FlashSaleDocument = FlashSale & Document;

@Schema({ _id: false })
export class Item {
  @Prop({ required: true, type: String })
  itemId: string;

  @Prop({ required: true })
  flashSaleQuantity: number;

  @Prop({ required: true, default: 20 })
  discount: number;
}
const ItemsSchema = SchemaFactory.createForClass(Item);

@Schema({ timestamps: true })
export class FlashSale {
  @Prop()
  name: string;

  @Prop({ required: true, default: STATUS_FLASHSALE_ENUM.INACTIVE })
  status: STATUS_FLASHSALE_ENUM;

  @Prop({ type: [ItemsSchema] })
  items: [Item];

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;
}

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);
FlashSaleSchema.plugin(mongoosePaginate);
FlashSaleSchema.plugin(mongooseAggregatePaginate);

export interface IFlashSaleModel extends Document, CreateFlashsaleDto {}
