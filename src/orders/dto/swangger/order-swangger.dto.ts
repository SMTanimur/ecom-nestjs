import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import mongoose from 'mongoose';

class UserOrder {
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  userId?: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  userName?: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  address: string;
}

class ItemOrder {
  _id?: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  barCode: string;
  @ApiProperty()
  price: number;
  @ApiPropertyOptional()
  @ApiProperty()
  amountOrder: number;

  @ApiPropertyOptional()
  flashSaleId?: mongoose.Schema.Types.ObjectId;
  flashSaleName?: string;
  @ApiPropertyOptional()
  flashSaleDiscount?: number;
  @ApiPropertyOptional()
  flashSaleQuantity?: number;
  @ApiPropertyOptional()
  voucherQuantity?: number;

  @ApiPropertyOptional()
  voucherId?: mongoose.Schema.Types.ObjectId;
  @ApiPropertyOptional()
  voucherDiscount?: number;
  @ApiPropertyOptional()
  codeVoucher?: string;

  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  originPrice: number;
}

export class OrderSwanggerDto {
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: UserOrder })
  user: UserOrder;

  @ApiProperty({ type: [ItemOrder] })
  items: [ItemOrder];

  @ApiProperty()
  status: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
