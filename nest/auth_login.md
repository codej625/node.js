# Login

<br />
<br />

- JWT기반 로그인 구현

---

```
NestJS에서는 기본 로그인 기능을 구현할 때
스프링부트와는 다르게 JWT을 기반으로 한다.
(스프링부트는 세션기반)

NestJS의 기술을 사용한 로그인 기능을 구현해보자.
사용되는 기술은 아래와 같다.
```

```
1) NestJS
구조화된 서버사이드 프레임워크

2) Prisma (@prisma/client)
타입세이프한 데이터베이스 ORM

3) PassportJS (@nestjs/passport)
인증 전략 미들웨어

4) PassportStrategy (PassportStrategy)
인증 전략 확장

5)JWT (@nestjs/jwt)
토큰 기반 인증

6) bcrypt
비밀번호 해싱

7) class-validator
데이터 검증
```

<br />
<br />
<br />
<br />

1. Prisma Schema

```
// schema.prisma

model User {
  id        Int      @id @default(autoincrement()) // pk지정 및 시퀀스 설정
  email     String   @unique // 이메일은 중복될 수 없음
  password  String // 사용자 비밀번호 (해시해서 저장)
  name      String? // 선택적인 이름 필드
  createdAt DateTime @default(now()) // 계정 생성 시간 자동 기록
  updatedAt DateTime @updatedAt // 마지막 업데이트 시간 자동 기록
}
```

<br />
<br />

2. DTO (Data Transfer Object)

```ts
// create-user.dto.ts

export class CreateUserDto {
  @IsEmail() // 이메일 형식 검증
  email: string;

  @IsNotEmpty()
  @MinLength(6) // 최소 6자 이상 비밀번호
  password: string;

  name?: string; // 선택적 이름
}

// login-user.dto.ts
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
```

<br />
<br />

3. Auth Service (인증 서비스)

```ts
// auth.service.ts

// 회원가입 로직
async register(createUserDto: CreateUserDto) {
  // 이미 존재하는 이메일인지 확인
  const existingUser = await this.prisma.user.findUnique({
    where: { email: createUserDto.email }
  });

  // 중복된 이메일이 있으면 에러 발생
  if (existingUser) {
    throw new ConflictException('Email already exists');
  }

  // 비밀번호 해시화 (암호화)
  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  // 사용자 생성
  const user = await this.prisma.user.create({
    data: {
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name
    }
  });

  return { id: user.id, email: user.email, name: user.name };
}

// 로그인 로직
async login(loginUserDto: LoginUserDto) {
  // 이메일로 사용자 찾기
  const user = await this.prisma.user.findUnique({
    where: { email: loginUserDto.email }
  });

  // 사용자가 없으면 에러
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // 비밀번호 검증 (해시된 비밀번호와 비교)
  const isPasswordValid = await bcrypt.compare(
    loginUserDto.password,
    user.password
  );

  // 비밀번호가 틀리면 에러
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // JWT 토큰 생성
  const payload = {
    sub: user.id,
    email: user.email
  };

  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  };
}
```

```
// 회원가입

1) 이메일 중복 확인
2) 비밀번호 해시화
3) 사용자 생성
```

```
// 로그인

1) 사용자 찾기
2) 비밀번호 검증
3) JWT 토큰 생성
```

<br />
<br />

4. AuthController (Route hendler)

```ts
// auth.controller.ts

@Controller("auth")
export class AuthController {
  @Post("register") // POST /auth/register
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("login") // POST /auth/login
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
```

<br />
<br />

5. JWT Strategy (인증 전략)

```ts
// strategies/jwt.strategy.ts

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Authorization 헤더에서 Bearer 토큰 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // 토큰 검증용 비밀 키
    });
  }

  // 토큰 검증 후 payload 반환
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
```

```
1) 비밀번호는 해시화되어 절대 평문으로 저장되지 않음
2) 이메일 중복 방지
3) 비밀번호 최소 길이 제한
4) JWT 토큰 인증
```

<br />
<br />

6. Module

```ts
// auth.module.ts

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60m" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

<br />
<br />

7. Test

```json
// POST /auth/register

{
  "email": "codej625@gmail.com",
  "password": "1234",
  "name": "이진우"
}
```

```json
// POST /auth/login

{
  "email": "user@example.com",
  "password": "secure123"
}
// Response { access_token: "...", user: {...} }
```
