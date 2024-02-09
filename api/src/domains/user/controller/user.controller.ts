import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user.service';
import UserDto from './dto/UserDto';
import { Response } from 'express';
import LoginDto from './dto/LoginDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  register(@Body(ValidationPipe) userDto: UserDto) {
    return this.userService.create(userDto);
  }
  @Post()
  async login(@Body(ValidationPipe) loginDto: LoginDto, @Res() res: Response) {
    const user = await this.userService.find(loginDto.email);
    if (user) {
      return res.json({
        result: 'User found',
        user,
      });
    } else {
      return res.json({
        result: 'User not found',
      });
    }
  }
  @Get('validate-email')
  async verifyExistingEmail(
    @Query('email') email: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserByEmail(email);
    return res.json({
      existing: user !== null,
      user: user?.id,
    });
  }
}
