import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { MulterModule } from '@nestjs/platform-express';
import { AboutModule } from './about/about.module';
import { WorkModule } from './work/work.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './uploads' }),
    AuthModule,
    UserModule,
    PrismaModule,
    HomeModule,
    AboutModule,
    WorkModule,
    CardModule,
  ],
})
export class AppModule {}
