import mongoose from 'mongoose';
import { ORDER_STATUS_ENUM } from '../orders.constain';

export class Order {}
export interface CreateItemOrder {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  barCode: string;
  price: number;
  flashSaleName?: string;
  flashSaleDiscount?: number;
  flashSaleQuantity?: number;
  stocksUpdate?: number;
  flashSaleQuantityUpdate?: number;
  voucherQuantity?: number;
  stocks?: number;
  totalPrice?: number;
  amountOrder?: number;
  originPrice?: number;
  voucherDiscount?: number;
  codeVoucher?: string;
  voucherId?: mongoose.Schema.Types.ObjectId;
  flashSaleId?: mongoose.Schema.Types.ObjectId;
}

export interface UserOrder {
  userId?: mongoose.Schema.Types.ObjectId;
  userName?: string;
  phone: string;
  address: string;
}

export class IOrder {
  _id?: mongoose.Schema.Types.ObjectId;
  user?: UserOrder;
  status?: ORDER_STATUS_ENUM;
  createdAt?: Date;
  updatedAt?: Date;
  items?: CreateItemOrder[];
  totalPrice?: number;
  originPrice?: number;
}
