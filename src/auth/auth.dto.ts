import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { USERS_ROLE_ENUM } from '../users/users.constant';
import { STATUS_ENUM } from '../shared/constants';
// Login DTO
export class LoginUserDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

// LOGIN RESPONE
export class UserResponeDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ enum: STATUS_ENUM, required: true })
  @IsNotEmpty()
  @IsEnum(STATUS_ENUM)
  status: STATUS_ENUM;

  @ApiProperty({ enum: USERS_ROLE_ENUM, required: true })
  @IsNotEmpty()
  @IsEnum(USERS_ROLE_ENUM)
  role: USERS_ROLE_ENUM;
}

export class LoginResponeDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ type: UserResponeDto, required: true })
  @IsNotEmpty()
  user: UserResponeDto;
}
