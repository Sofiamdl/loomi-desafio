import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    DatabaseModule,
    HttpModule,
    AuthModule,
  ],
})
export class AppModule {}
