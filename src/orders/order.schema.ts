import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ORDER_STATUS_ENUM } from './orders.constain';

import * as mongoosePaginate from 'mongoose-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type OrderDocument = Order & Document;

// Item Schema
@Schema({ _id: false })
class Item {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  barCode: string;

  @Prop({ required: true })
  amountOrder: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  flashSaleName?: string;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  flashSaleId?: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false })
  flashSaleDiscount?: number;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  voucherId?: mongoose.Schema.Types.ObjectId;

  @Prop({ required: false })
  voucherDiscount?: number;

  @Prop({ required: false })
  codeVoucher?: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  originPrice: number;
}
const itemSchema = SchemaFactory.createForClass(Item);

// User Schema

@Schema({ _id: false })
class User {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;
}
const userSchema = SchemaFactory.createForClass(User);

// Voucher Schema
@Schema({ _id: false })
class Voucher {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  voucherId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  voucherName: string;

  @Prop({ required: true })
  voucherDiscount: number;

  @Prop({ required: true })
  applyCategories: string[];
}

// Main Schema ( ORDER SCHEMA)
@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  originPrice: number;

  @Prop({ required: true, type: [itemSchema] })
  items: Item[];

  @Prop({ required: true, type: userSchema })
  user: User;

  @Prop({ required: true, default: ORDER_STATUS_ENUM.CONFIRM })
  status: ORDER_STATUS_ENUM;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(mongooseAggregatePaginate);

export interface IOrderModel extends Document, Order {}
