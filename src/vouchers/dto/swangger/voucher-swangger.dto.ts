import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class VoucherSwanggerDto {
  @ApiProperty({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: String })
  nameVoucher: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  code: string;

  @ApiProperty({ type: [String] })
  categories: [string];

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  discount: number;

  @ApiProperty({ type: Date })
  startTime: Date;

  @ApiProperty({ type: Date })
  endTime: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
