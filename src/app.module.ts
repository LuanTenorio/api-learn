import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule { }
