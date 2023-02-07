import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/users.dto';
import { LoginUserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  BadRequestDto,
  UnauthorizedExceptionDto,
} from '../swangger/swangger.dto';
import { StatusRespone } from '../shared/respone.dto';
import { ApiCommonResponse } from 'src/decorators/common-response.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //
  @ApiBody({ type: LoginUserDto, description: 'Enter your email and password' })
  @ApiAcceptedResponse({
    type: String,
    description: 'Token login',
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
    description: 'Email, password wrong is invalid ',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedExceptionDto,
    description: 'Account is not activated',
  })
  @HttpCode(202)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //
  @ApiCreatedResponse({
    type: StatusRespone,
    description: 'Register success',
  })
  @ApiCommonResponse()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.regisrer(createUserDto);
  }

  //
  @ApiOkResponse({ type: StatusRespone })
  @ApiCommonResponse()
  @Get('verify')
  verify(@Query('token') token: string) {
    return this.authService.verify(token);
  }
}
