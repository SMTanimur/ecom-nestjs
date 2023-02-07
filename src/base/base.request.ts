import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BaseRequest {
  keyWord?: string;

  status?: string;

  page?: number;

  perPage?: number;

  sortDate?: string;

  startDate?: Date;

  endDate?: Date;

  sortName?: string;

  sortBy?: string;

  sortType?: string;
}

export class BaseRequestDto {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  keyWord?: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  perPage?: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  sortDate?: string;

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({
    type: Number,
    example: 2,
    description:
      'The only option available is `2`. The difference is version 2 will use `metadata` as pagination info',
  })
  @IsOptional()
  paginationVersion?: number;
}
