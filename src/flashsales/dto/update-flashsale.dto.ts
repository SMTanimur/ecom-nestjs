import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { STATUS_FLASHSALE_ENUM } from '../flashsale.constain';
import { CreateFlashsaleDto } from './create-flashsale.dto';

export class UpdateFlashsaleDto extends PartialType(CreateFlashsaleDto) {
  @ApiPropertyOptional({
    enum: STATUS_FLASHSALE_ENUM,
    default: STATUS_FLASHSALE_ENUM.INACTIVE,
  })
  @IsOptional()
  status?: STATUS_FLASHSALE_ENUM;
}
