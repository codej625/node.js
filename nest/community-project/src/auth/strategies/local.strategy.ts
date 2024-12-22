import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { LoginUserDto } from 'src/common/dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // 기본값은 'username'
      passwordField: 'password',
    });
  }

  // validate 메서드는 필수로 구현해야 함
  async validate(email: string, password: string): Promise<any> {
    const loginUserDto: LoginUserDto = new LoginUserDto();
    loginUserDto.email = email;
    loginUserDto.password = password;

    // 1) 유효성 검증
    const user = await this.authService.validateUser(loginUserDto);

    return user; // request.user에 저장됨
  }
}
