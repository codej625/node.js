import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpApiExceptionFilter } from './common/exceptions/http-api-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpApiExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
