import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class category {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  id: mongoose.Schema.Types.ObjectId;
}

export class ItemDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  barCode: string;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  cost: number;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  avatarImg: string;

  @ApiProperty({ required: true })
  @IsArray()
  detailImgs?: string[];

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  descriptions: string;

  @ApiProperty({ required: true, type: category })
  @IsNotEmpty()
  @Type(() => category)
  @ValidateNested()
  category: category;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  stocks: number;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsArray()
  tags: string[];
}
