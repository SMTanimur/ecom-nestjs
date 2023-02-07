import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ErrorModelDto {
  @ApiProperty()
  @IsString()
  statusCode: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  erro: string;

  //   @ApiProperty()
  //   @IsString()
  //   path: string;
}
