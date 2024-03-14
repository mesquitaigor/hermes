import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../domains/user/user.module';
import AuthService from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy, JwtGuard, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
