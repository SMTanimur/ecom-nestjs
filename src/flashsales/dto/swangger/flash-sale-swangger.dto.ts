import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { STATUS_FLASHSALE_ENUM } from '../../flashsale.constain';

export class Item {
  @ApiProperty({ type: String })
  itemId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: Number })
  flashSaleQuantity: number;

  @ApiProperty({ type: Number })
  discount: number;
}

export class FlashSaleSwangger {
  @ApiProperty({ type: String })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({
    enum: STATUS_FLASHSALE_ENUM,
    required: true,
    default: STATUS_FLASHSALE_ENUM.INACTIVE,
  })
  status: STATUS_FLASHSALE_ENUM;

  @ApiProperty({ type: [Item] })
  items: [Item];

  @ApiProperty({ type: Date })
  startTime: Date;

  @ApiProperty({ type: Date })
  endTime: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
