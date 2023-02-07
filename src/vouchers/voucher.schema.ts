import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type VoucherDocument = Voucher & Document;

@Schema({ timestamps: true })
export class Voucher {
  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  categories: string[];

  @Prop({ required: true })
  nameVoucher: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  description: string;
}
export interface IVoucherModel extends Document, Voucher {}
export const VoucherSchema = SchemaFactory.createForClass(Voucher);
VoucherSchema.plugin(mongoosePaginate);
VoucherSchema.plugin(mongooseAggregatePaginate);
