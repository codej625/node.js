import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { LoginUserDto } from '../common/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  // 회원가입 메서드
  public async register(createUserDto: CreateUserDto) {
    // 이미 존재하는 유저인지 확인
    const existingUser = await this.usersService.findUser(createUserDto);
    if (existingUser) throw new ConflictException('이미 존재하는 이메일입니다.');

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    // 유저 생성
    return this.usersService.createUser(createUserDto);
    // return this.prisma.user.create({
    //   data: {
    //     email: createUserDto.email,
    //     password: hashedPassword,
    //     name: createUserDto.name,
    //   },
    // });
  }

  // 로그인 메서드
  public async login(email: string, password: string) {
    // 유저 찾기
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');

    // 토큰 생성
    const tokens = await this.generateTokens(user.id, user.email);

    // 리프레시 토큰 저장
    await this.updateRefreshTokenInDB(user.id, tokens.refreshToken);

    return tokens;
  }

  // 리프레시 토큰으로 새 액세스 토큰 발급
  public async refreshAccessToken(refreshToken: string) {
    try {
      // 리프레시 토큰 검증
      const decoded = await this.jwtService.verifyAsync(refreshToken, { secret: this.configService.get('JWT_REFRESH_SECRET') });
      // 유저 조회
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      });

      if (!user) throw new UnauthorizedException('유저를 찾을 수 없습니다.');

      // 저장된 리프레시 토큰과 일치 확인
      const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken || '');

      if (!isRefreshTokenValid) throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');

      // 새 액세스 토큰 발급
      const newAccessToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '5m',
        },
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('다시 로그인해주세요.');
    }
  }

  public async findUser(loginUserDto: LoginUserDto): Promise<any> {
    return this.usersService.findUser(loginUserDto);
  }

  public async validateUser(loginUserDto: LoginUserDto) {
    return this.usersService.validateUser(loginUserDto);
  }

  // 토큰 생성 메서드
  private async generateTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '5m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '1d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // 리프레시 토큰 DB 업데이트
  private async updateRefreshTokenInDB(userId: number, refreshToken: string) {
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken,
        refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }
}
