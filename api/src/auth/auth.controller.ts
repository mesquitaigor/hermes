import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import LoginDto from '../domains/user/controller/dto/LoginDto';
import UserDto from '../domains/user/controller/dto/UserDto';
import { UserService } from '../domains/user/user.service';
import AuthService from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';

@Controller('')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('register')
  async register(@Body(ValidationPipe) userDto: UserDto, @Res() res: Response) {
    const foundUser = await this.userService.getUserByEmail(userDto.email);
    if (foundUser === null) {
      const user = await this.userService.create(userDto);
      return res.json({
        createdUser: user.id,
        created: true,
        error: null,
      });
    } else {
      return res.json({
        createdUser: null,
        created: false,
        error: 'Usuário já existe',
      });
    }
  }
  @Post('authenticate')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return await this.authService.login(user);
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
  @UseGuards(JwtGuard) // Aplique o Guard JWT aqui
  @Get('auth')
  verifyToken() {
    return { message: 'Valid token' };
  }
}
