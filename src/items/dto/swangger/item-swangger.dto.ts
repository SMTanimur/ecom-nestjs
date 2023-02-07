import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

class Category {
  @ApiProperty({ type: String })
  id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: String })
  name: string;
}
export class ItemSwangger {
  @ApiProperty({ type: String })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  barCode: string;

  @ApiProperty({ type: Number })
  cost: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number })
  weight: number;

  @ApiProperty({ type: String })
  avatarImg: string;

  @ApiProperty({ type: [String] })
  detailImgs: [string];

  @ApiProperty({ type: String })
  descriptions;

  @ApiProperty({ type: Category })
  category: Category;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  stocks: number;

  @ApiProperty({ type: Number })
  sold: number;

  @ApiProperty({ type: [String] })
  tags: [string];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
