import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  providers: [PrismaService, AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
