import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsEndTime, IsStartTime } from '../../shared/custom-validator.dto';
import { STATUS_FLASHSALE_ENUM } from '../flashsale.constain';

class flashSaleItemInfor {
  @ApiProperty()
  @IsString()
  itemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  flashSaleQuantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(1)
  discount: number;
}

export class CreateFlashsaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ enum: STATUS_FLASHSALE_ENUM })
  @IsNotEmpty()
  @IsEnum(STATUS_FLASHSALE_ENUM)
  @IsOptional()
  status?: STATUS_FLASHSALE_ENUM;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsStartTime({ message: 'start time must be future' })
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @IsEndTime('startTime', {
    message: 'end time is greater than start time',
  })
  endTime: Date;

  @ApiProperty({ type: [flashSaleItemInfor] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => flashSaleItemInfor)
  items: [flashSaleItemInfor];
}
