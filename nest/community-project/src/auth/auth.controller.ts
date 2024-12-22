// src/auth/auth.controller.ts
import { Controller, Post, Body, Headers, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { LoginUserDto } from '../common/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 회원가입
  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // 로그인
  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // Access 토큰 재발급
  @Post('refresh')
  async refreshToken(@Headers('refresh-token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
