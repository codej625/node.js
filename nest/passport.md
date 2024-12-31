# Passport

<br />
<br />

- NestJS Passport

---

```
NestJS Passport는 인증을 구현하기 위한 미들웨어이다.

Passport는 다양한 인증 전략(strategies)을 제공하는 Node.js 인증 미들웨어이며,
NestJS는 이를 @nestjs/passport 모듈을 통해 통합한다.

조금더 비유를 덧대어 설명하면,
공항의 Passport는 "출입국 심사관"이다.

사용자가 서버에 접근할 때 그 사용자가 누구인지 확인하는 역할을 한다.
```

<br />
<br />
<br />
<br />

1. 작동 순서 (인터셉터는 순서에서 제외)

```
1) Incoming request

2) Guards

3) Pipes

4) Controller -> Service -> Repository
```

<br />
<br />
<br />

2. Strategy 구현

```
먼저 "사용자 이름"과 "비밀번호"로 인증하는 Strategy (passport-local),
"JWT"를 인증하는 Strategy를 구현해야 한다. (passport-jwt)

최종적으로 로그인 시 "사용자 이름"과 "비밀번호"가 인증되면 서버는 "JWT"를 발급하고,
클라이언트는 발급 받은 Token을 헤더에 담아 후속 요청에서 인증을 증명해야 한다.

https://docs.nestjs.com/recipes/passport#implementing-passport-strategies
위의 주소로 접속하면 아주 상세한 예시가 있다.
```

<br />
<br />
<br />

3. Guard

```
가드는 단일 책임을 갖는다.

런타임에 존재하는 특정 조건(예: 권한, 역할, ACL 등)에 따라
주어진 요청이 경로 핸들러에 (Controller) 의해 처리될지 여부를 결정한다.

주로 passport로 인증 전략을 만들어 가드에 전략을 사용할 수 있다.
```

```ts
// JWT 전략
export class JwtStrategy extends PassportStrategy(Strategy) { ... }

// Local 전략
export class LocalStrategy extends PassportStrategy(Strategy) { ... }

...

@Controller('auth')
export class AuthController {
  @UseGuards(JwtStrategy) // JWT 전략 사용
  @Get('profile')
  getProfile() { ... }

  @UseGuards(LocalStrategy) // Local 전략 사용
  @Post('login')
  login() { ... }
}
```

<br />
<br />
<br />

4. Tip

```
1) Passport 이름 지정

PassportStrategy(Strategy, 'jwt')에서
두 번째 파라미터 'jwt'는 해당 전략의 이름(name)을 지정하는 것이다.
```

```ts
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('jwt')) // JWT 전략 사용 (이런식으로 전략 매칭이 가능하다.)
  @Get('profile')
  getProfile() { ... }

  @UseGuards(AuthGuard('local')) // Local 전략 사용
  @Post('login')
  login() { ... }
}
```

<br />
<br />

```
2) JWT 모듈 설정 방법 두 가지

기본적으로 모듈에서 register를 사용해 JWT 값을 설정할 수 있다.
다른 방법으로는 서비스에서 구현하는 것이다.
```

```ts
// auth.module.ts 에서 설정

@Module({
  imports: [
    // Passport 모듈 임포트
    PassportModule,

    // JWT 모듈 설정
    JwtModule.register({
      secret: "your-secret-key", // 실제로는 환경변수에서 가져와야 함
      signOptions: {
        expiresIn: "5m", // 액세스 토큰 만료시간
      },
    }),

    // 다른 필요한 모듈들 (예: UserModule)
    UsersModule,
  ],
  providers: [
    AuthService,
    LocalStrategy, // 로컬 전략 등록
    JwtStrategy, // JWT 전략 등록
  ],
  controllers: [AuthController],
  exports: [AuthService], // 다른 모듈에서 AuthService를 사용할 수 있게 export
})
export class AuthModule {}
```

```ts
// auth.service.ts 에서 설정

import { JwtService } from '@nestjs/jwt'; // jwt 서비스를 import한다.

... 생략

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
```

```
이런 식으로 모듈이 아닌,
서비스에서 동적으로 config값을 구현할 수 있다.
```
