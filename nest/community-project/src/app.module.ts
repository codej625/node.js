import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
