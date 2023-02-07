import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { STATUS_ENUM } from '../../categories.constant';

export class CategorySwanggerRespone {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    enum: STATUS_ENUM,
    required: true,
    default: STATUS_ENUM.INACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
