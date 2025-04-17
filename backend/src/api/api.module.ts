import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [
    // UserModule,
    // HealthModule,
    AuthModule,
    // HomeModule,
    // PostModule,
    PackageModule,
    // PropertyModule,
  ],
})
export class ApiModule {}
