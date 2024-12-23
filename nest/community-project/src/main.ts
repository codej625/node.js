import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpApiExceptionFilter } from './common/exceptions/http-api-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Http 전역 예외처리
  app.useGlobalFilters(new HttpApiExceptionFilter());
  // CORS 상세 옵션 설정
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // 허용할 도메인
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 허용할 HTTP 메서드
    credentials: true, // 쿠키 포함 여부
    allowedHeaders: 'Content-Type, Accept, Authorization', // 허용할 헤더
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
