import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

class ItemDetail {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemId: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: [ItemDetail] })
  @ValidateNested({ each: true })
  @Type(() => ItemDetail)
  @IsNotEmpty()
  items: ItemDetail[];

  @ValidateNested({ each: true })
  @Type(() => User)
  @ApiProperty({ type: User })
  @IsNotEmpty()
  user: User;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  voucherCode?: string;
}
