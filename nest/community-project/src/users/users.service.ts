import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { LoginUserDto } from '../common/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // 이메일로 유저 찾기
  public async findUser(findUserDto: LoginUserDto) {
    // 유저 찾기
    const user = await this.prismaService.user.findUnique({
      where: { email: findUserDto.email },
    });

    return user;
  }

  // 유저 생성
  public async createUser(createUserDto: CreateUserDto) {
    // 1) 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // 2) 유저 생성
    const user = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
      },
    });

    return user;
  }

  // 유저 리프레시 토큰 업데이트
  public async updateRefreshTokenInDB(email: string, refreshToken: string) {
    // 1) 리프레시 토큰 해쉬화
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10);
    // 2) 리프레시 토큰 업데이트
    await this.prismaService.user.update({
      where: { email },
      data: {
        refreshToken: hashedRefreshToken,
        refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  // Passport Strategy 유효성 검사
  public async validateUser(loginUserDto: LoginUserDto) {
    // 1) 유저 찾기
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');
    // 2) 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('잘못된 비밀번호입니다.');

    return user;
  }
}
