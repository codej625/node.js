import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './../auth.service';
import { LoginUserDto } from 'src/common/dto/login-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  // JWT 검증 메서드
  async validate(payload: { sub: number; email: string }): Promise<any> {
    const loginUserDto: LoginUserDto = new LoginUserDto();
    loginUserDto.email = payload.email;

    const user = await this.authService.findUser(loginUserDto);
    return user; // request.user에 저장됨
  }
}
