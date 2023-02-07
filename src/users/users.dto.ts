import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { STATUS_ENUM } from '../shared/constants';
import { USERS_ROLE_ENUM } from './users.constant';

export class CreateUserDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ required: true, type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @MinLength(9)
  @MaxLength(11)
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  address?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(USERS_ROLE_ENUM)
  role?: USERS_ROLE_ENUM;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(STATUS_ENUM)
  status?: STATUS_ENUM;
}
