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
    // 1) 이미 존재하는 유저인지 확인
    const existingUser = await this.usersService.findUser(createUserDto);
    if (existingUser) throw new ConflictException('이미 존재하는 이메일입니다.');

    // 2) 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    // 3) 유저 생성
    return this.usersService.createUser(createUserDto);
  }

  // 로그인 메서드
  public async login(loginUserDto: LoginUserDto) {
    // 1) 유저 찾기
    const user = await this.usersService.findUser(loginUserDto);
    if (!user) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');

    // 2) 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');

    // 3) 엑세스, 리프레시 토큰 생성
    const tokens = await this.generateTokens(user.id, user.email);

    // 4) 리프레시 토큰 저장
    await this.updateRefreshTokenInDB(user.id, tokens.refreshToken);

    // 5) 두 개의 토큰 리턴
    return tokens;
  }

  // 리프레시 토큰으로 새 액세스 토큰 발급
  public async refreshAccessToken(refreshToken: string) {
    try {
      // 1) 리프레시 토큰 검증
      const decoded = await this.jwtService.verifyAsync(refreshToken, { secret: this.configService.get('JWT_REFRESH_SECRET') });
      // 2) 유저 조회
      const loginUserDto: LoginUserDto = new LoginUserDto();
      loginUserDto.email = decoded.email;

      const user = await this.usersService.findUser(loginUserDto);
      if (!user) throw new UnauthorizedException('유저를 찾을 수 없습니다.');

      // 3) 저장된 리프레시 토큰과 비교 확인
      const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken || '');
      if (!isRefreshTokenValid) throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');

      // 4) 새 액세스 토큰 발급
      const newAccessToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '5m', // 우효기간 설정 5분
        },
      );
      // 5) 새로운 엑세스 토큰 리턴
      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('다시 로그인해주세요.');
    }
  }
  // 이메일로 유저 찾기
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
