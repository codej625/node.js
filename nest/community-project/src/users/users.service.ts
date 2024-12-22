import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { LoginUserDto } from '../common/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // 유저 찾기
  public async findUser(findUserDto: LoginUserDto | CreateUserDto) {
    // 유저 찾기
    const user = await this.prismaService.user.findUnique({
      where: { email: findUserDto.email },
    });
    if (!user) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');

    return user;
  }

  // 유저 생성
  public async createUser(createUserDto: CreateUserDto) {
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
      },
    });

    return user;
  }

  // Strategy 검증
  public async validateUser(loginUserDto: LoginUserDto) {
    // 유저 찾기
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');
    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('잘못된 비밀번호입니다.');

    return user;
  }
}
