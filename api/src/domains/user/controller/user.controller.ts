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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  register(@Body(ValidationPipe) userDto: UserDto) {
    return this.userService.create(userDto);
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
