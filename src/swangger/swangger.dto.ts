import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BadRequestDto {
  @ApiProperty({ type: Number, default: 400 })
  @IsString()
  @IsNumber()
  statusCode: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  error: string;
}

export class UnauthorizedExceptionDto {
  @ApiProperty({ type: Number, default: 401 })
  @IsString()
  @IsNumber()
  statusCode: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  error: string;
}

export class InternalServerErrorExceptionDto {
  @ApiProperty({ type: Number, default: 500 })
  @IsString()
  @IsNumber()
  statusCode: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  error: string;
}

export class ConFlictExceptionDto {
  @ApiProperty({ type: Number, default: 409 })
  @IsString()
  @IsNumber()
  statusCode: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  error: string;
}

export class NotFoundExceptionDto {
  @ApiProperty({ type: Number, default: 404 })
  @IsString()
  @IsNumber()
  statusCode: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  error: string;
}
