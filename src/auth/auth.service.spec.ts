import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from '../emails/emails.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { mockIUser, mockUserFindOne, mockvalidateUser } from './auth.mock';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserService = {
    findOne: jest.fn(() => mockUserFindOne),
    findOneAndUpdate: jest.fn(),
  };

  const mockEmailService = {
    sendMessage: jest.fn(),
  };

  const mockJwtService = {
    verify: jest.fn(() => true),
    sign: jest.fn(() => '1'),
    decode: jest.fn(() => ({
      id: '1',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, EmailsService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(EmailsService)
      .useValue(mockEmailService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('[Expect-success] validate user', async () => {
      // mockUserService.findOne.mockResolvedValue(user);
      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      expect(await authService.validateUser('1', '1')).toEqual(
        mockvalidateUser,
      );
    });
  });

  describe('login', () => {
    it('[Expect-success] Should call service to login', async () => {
      expect(await authService.login(mockIUser)).toEqual({
        accessToken: '1',
        user: mockIUser,
      });
    });
  });

  describe('verify', () => {
    it('[Expect-success] Should verify account ', async () => {
      expect(await authService.verify('123')).toBe('Account actived');
    });

    it('[Expect-Badreques] ', async () => {
      mockJwtService.verify.mockReturnValue(false);
      // expect(await authService.verify('123')).rejects.toBeInstanceOf(
      //   BadRequestException,
      // );
      try {
        await authService.verify('123');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
