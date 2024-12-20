import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth.service';

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
    const user = await this.authService.validateUser(email, password);

    return user; // request.user에 저장됨
  }
}
