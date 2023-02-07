import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { STATUS_ENUM } from '../shared/constants';

export class CreateCategoryDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  @IsOptional()
  status?: STATUS_ENUM;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  priority?: number;
}
